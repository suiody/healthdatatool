#README

Motivation: Development databases contain a wealth of information, yet many are geared toward analysts, or others in technical roles, and the user interfaces require a bit of a learning curve.

This open source project aims to:  
- to provide a simple, intuitive web app to enable users to search several popular development databases for health and environmental datasets
- allow users to quickly visualize data and download results


The completed app will:
- enable users query popular development databases
- provide a simple graphing application to visualize the different datasets
- enable download data in .csv format, or graphs as .jpg or .png format
- have access to some archived data for popular datasets, in the event that one of the databases is not accessible, enabled by a back-end rails API

The app is currently under development, however, if you'd like to check the current progress, follow the steps below. Currently, users can query the DHS database through the app and see dynamic graphs of results, or search selected archived indicators, which query the rails API. I am in the process of adding download functionality for the data, then will move onto adding additional databases to search.

Download & Install
- clone the rails repository (backend Ruby-on-Rails) 'healthdatatool-api'
- navigate to the rails repository on your local machine
- start the rails server on port 3001

```
$ git clone https://github.com/cheneyshreve/healthdatatool-api.git
$ cd healthdatatool-api
$ rails s -p 3001
```
- clone the current repository 'healthdatatool'
- navigate to the react repository on your local machine
- navigate to localhost:3000 in your browser 

```
$ git clone https://github.com/cheneyshreve/healthdatatool.git
$ cd healthdatatool
$ npm install
$ npm start
navigate to localhost:3000 in your browser
```
