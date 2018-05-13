module.exports = {
  query: query
}

const mySql = require('mysql')

//object which holds the connection to the db
let connection = null

function initConnection() {

  //set the global connection object
   connection = mySql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myoAuth2'
  })
}

function query(queryString, callback){

  initConnection()

  //connect to the db
  connection.connect()

  //execute the query and collect the results in the callback
  connection.query(queryString, function(error, results, fields){

      console.log('mySql: query: error is: ', error, ' and results are: ', results);

    connection.end();

    callback(createDataResponseObject(error, results))
  })
}

function createDataResponseObject(error, results) {

    return {
      error: error,
      results: results === undefined ? null : results === null ? null : results
     }
  }
