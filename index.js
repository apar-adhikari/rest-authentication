/*
  Author: Apar Adhikari
*/
const port = 4200;
const mySqlConnection = require('./databaseHelpers/mySqlWrapper')
const accessTokenDBHelper = require('./databaseHelpers/accessTokensDBHelper')(mySqlConnection)
const userDBHelper = require('./databaseHelpers/userDBHelper')(mySqlConnection)
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper)
const oAuth2Server = require('node-oauth2-server')
const express = require('express')
const expressApp = express()
expressApp.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
})

const authRoutesMethods = require('./authorisation/authRoutesMethods')(userDBHelper)
const authRoutes = require('./authorisation/authRoutes')(express.Router(), expressApp, authRoutesMethods)
const bodyParser = require('body-parser')

expressApp.use(bodyParser.urlencoded({ extended: true }));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

expressApp.use(expressApp.oauth.errorHandler());

expressApp.use('/auth', authRoutes);

/* Routes for api end points requiring access token */
// expressApp.use('/api', apiRoutes)

expressApp.listen(port, () => {
   console.log(`listening on port ${port}`)
})
