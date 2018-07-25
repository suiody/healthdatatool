# README

Motivation: Development databases contain a wealth of information, yet many are geared toward analysts, or others in technical roles, and the user interfaces require a bit of a learning curve.

This open source project aims to:  
- to provide a simple, intuitive web app to enable users to search several popular development databases for health and environmental datasets
- allow users to quickly visualize data and download results

The completed app will:
- enable users query popular development databases
- provide a simple graphing application to visualize the different datasets
- enable download data in .csv format, or graphs as .jpg or .png format
- have access to some archived data for popular datasets, in the event that one of the databases is not accessible, enabled by a back-end rails API

The app is currently under development, however, if you'd like to check the current progress on [heroku](https://glacial-beach-89300.herokuapp.com/), check out this short demo of graphing data from different databases through the app.
![alt text](https://raw.githubusercontent.com/cheneyshreve/healthdatatool/master/src/images/hdt_demo.gif)

Download & Install
- fork or clone the rails repository (backend Ruby-on-Rails) 'healthdatatool-api'
- navigate to the rails repository on your local machine
- start the rails server on port 3001


## Contributing
The project is housed in two separate repositories, [healthdatatool](https://github.com/cheneyshreve/healthdatatool), which provides the front-end in React, and [healthdatatool-api](https://github.com/cheneyshreve/healthdatatool-api), which is the Rails 5 API with a postgreSQL database housing archive data. You can contribute to either, or both. You can run the front-end separately, however, you will not have access to the "archives" component. Alternatively, you can contribute to the database through the backend repository without downloading the frontend repository.

Please note: if you would like to modify the Rails-5 database, you will need to message me to get the relevant environment details. My email is visible in my GitHub profile.

### Installation and Setup
Set up a local copy on your computer:
- fork the backend repository
- clone the backend repository
- navigate to healthdatatool-api on your local machine
- start the rails server on port 3001

```
$ rails s -p 3001
```

- fork the frontend repository
- clone the frontend repository
- navigate to healthdatatool directory on your local machine
- install npm
- run npm
- navigate to localhost:3000 in your browser

```
$ npm install
$ npm start
navigate to localhost:3000 in your browser
```
## Contributing Guidelines
- Follow the installation instructions above
- Read the code of conduct in the master branch
- Check out the open issues under the issues tab, or recommend a new feature or issue
- Create a new feature branch in your repo, do some work, submit a pull request
- First-timer? See this [article](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) for step-by-step guidelines on contributing. Newbies are welcome!
