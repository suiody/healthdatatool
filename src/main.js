
// Note: this code is from https://api.dhsprogram.com/#/sample-apps.cfm

"use strict";

var gAPIDomain = "https://api.dhsprogram.com/rest/dhs/"
/*****************************************************************
function:   OnDocumentReady
Desc.:      JQuery function that is called once the page is loaded.
            You need to add all your events in here to make sure
            they are executed after the document is loaded.
*****************************************************************/
$(document).ready(function(){

    //Setup the different select choices.
    var listCountries = $("#lstCountry");
    var listSurveyYears = $("#lstYears");
    var listIndicators = $("#lstIndicators");
    var listCharGroups = $("#lstCharacteristicsGroup");
    var arrData = {};
    var chartType = 'column';

    //Load the List of Countries.
    $.getJSON(gAPIDomain + "countries?surveyType=DHS", function(data) {
        $.each(data.Data, function (index, value) {
            listCountries.append($("<option />").val(value.DHS_CountryCode).text(value.CountryName));
        });
        listCountries.change();    //Force call on change for the first time to populate Survey list.
    });

    /*****************************************************************
    function:   onchange - lstCountry
    Desc.:      JQuery function that is called if a selection is
                changed in the Countries List. The function calls the
                API and obtains a list of Survey Years associated with
                the country selected.
    *****************************************************************/
    listCountries.on('change', function() {
        //Obtain the currently selected country.
        var strCountry = listCountries.val();

        //Create URL to obtain survey years.
        var apiURL = gAPIDomain + "surveys/" + strCountry + "?surveyType=DHS";

        //Obtain Survey Years.
        $.getJSON(apiURL, function(data) {
            //Clear the list before you update it.
            listSurveyYears.find('option').remove();

            //Update List to new Survey Years particular to the country selected.
            $.each(data.Data, function (index, value) {
                listSurveyYears.append($("<option />").val(value.SurveyId).text(value.SurveyYearLabel));
            });
            listSurveyYears.change();    //Force call on change for the first time to populate Indicator list.
        });
    });

    /*****************************************************************
    function:   onchange - listSurveyYears
    Desc.:      JQuery function that is called if a selection is
                changed in the Survey List. The function calls the
                API and obtains a list of Indicators for this survey
                and populates the indicators list.
    *****************************************************************/
    listSurveyYears.on('change', function() {
        //Obtain the currently selected country and Survey Year.
        var strCountry = listCountries.val();
        var strSurveyYear = listSurveyYears.val();

        //Create URL to obtain indicators. Specify 1000 rows to get maximum results.
        var apiURL = gAPIDomain + "indicators?countryIds=" + strCountry + "&surveyIds=" + strSurveyYear + "&perpage=1000&f=json";

        //Obtain Indicators.
        $.getJSON(apiURL, function(data) {
            //Clear the list before you update it.
            listIndicators.find('option').remove();

            //Update List to new Indicators particular to the country and survey year selected.
            $.each(data.Data, function (index, value) {
                listIndicators.append($("<option />").val(value.IndicatorId).text(value.Label));
            });
            listIndicators.change();    //Force call on change for the first time to populate Characteristics Group list.
        });
    });

    /*****************************************************************
    function:   onchange - lstIndicator
    Desc.:      JQuery function that is called if a selection is
                changed in the Indicators List. The function calls the
                API and obtains a list of characteristic groups.
    *****************************************************************/
    listIndicators.on('change', function() {
        //Obtain the currently selected country and Survey Year.
        var strCountry = listCountries.val();
        var strSurveyYear = listSurveyYears.val();
        var strIndicator = listIndicators.val();

        //Create URL to obtain data.
        var apiURL = gAPIDomain +
                        "data?countryIds=" + strCountry +
                        "&surveyIds=" + strSurveyYear +
                        "&indicatorIds=" + strIndicator +
                        "&f=json&perpage=1000&breakdown=all";
        console.log(apiURL);
        //Reset the Array.
        arrData = undefined;
        arrData = {};

        //Obtain data.
        $.getJSON(apiURL, function(data) {
            //Create the data tree from data obtained via query.
            $.each(data.Data, function (index, value) {
                //If the characteristics Category does not exist, create it.
                if(!arrData[value.CharacteristicCategory]) {
                    arrData[value.CharacteristicCategory] = {};
                    arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
                    arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
                }
                else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel])
                {
                    arrData[value.CharacteristicCategory][value.CharacteristicLabel] = {};
                    arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
                }
                else if(!arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel])
                {
                    if(value.ByVariableLabel.length > 0)
                    {
                        arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
                    }
                }
                else
                {
                    if(value.ByVariableLabel.length > 0)
                    {
                        arrData[value.CharacteristicCategory][value.CharacteristicLabel][value.ByVariableLabel] = value.Value;
                    }
                }
            });

            //The data has been obtained, populate the Characteristics Group drop down.
                //Clear the list before you update it.
            listCharGroups.find('option').remove();
            $.each(arrData, function(key, value) {
                listCharGroups.append($("<option />").val(key).text(key));
            });
            listCharGroups.change();    //Force call on change for the first time to populate chart.
        });
    });

    /*****************************************************************
    function:   onchange - lstCharacteristicsGroup
    Desc.:      JQuery function that is called if a selection is
                changed in the Characteristics Group List. The function
                updates the chart according to the Characteristics
                group chosen
    *****************************************************************/
    listCharGroups.on('change', function() {
        //Declare Important Variables.
        var xAxisCategories = [];
        var arrSeriesNames = [];
        var arrSeriesValues = {};

        //Gather data for the particular characteristics group selected and create a chart.
        var strCharGroup = listCharGroups.val();

        //Organize the data to create a visual chart.
        $.each(arrData[strCharGroup], function(key, value) {
            xAxisCategories.push(key);
            $.each(arrData[strCharGroup][key], function(label, value) {
                //If the label has not been created, create it.
                if(arrSeriesNames.indexOf(label) == -1)
                {
                    arrSeriesNames.push(label);
                    arrSeriesValues[label] = [];
                    arrSeriesValues[label].push(value);
                }
                else
                {
                    arrSeriesValues[label].push(value);
                }
            });
        });

        //Create a visual chart.
        /*
            For this particular example a HighCharts plug-in is used.
            Please change the code below to utilize your own representation tools.
        */
        $('#charts').highcharts({
            chart: {
                type: chartType
            },
            title: {
                text: listIndicators.find('option:selected').text()
            },
            xAxis: {
                categories: xAxisCategories
            },
            yAxis: {
                title: {
                    text: 'Value'
                }
            },
            credits: {
                enabled: false
            }
        });

        //Add series.
        var chart = $('#charts').highcharts();
        $.each(arrSeriesNames, function(key, value) {
        chart.addSeries(
            { name: value.toString(),
              data: arrSeriesValues[value]
            });
        });
    });
});
