// This should be called onChange, when the user makes a selection from drop down
getCharacteristics(){
    axios.get('https://api.dhsprogram.com/rest/dhs')
    .then(response => {
      this.setState({
        characteristics: response.data.Data
      });
    });
  }
  // not every indicator will have a characteristic category, so if not, create it.
  let characteristics = this.state.characteristics;
  let arrData = {};

  this.state.characteristics.map((value, index) => {
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
 this.setState({characteristics: arrData });

}
