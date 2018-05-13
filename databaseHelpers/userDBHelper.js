let mySqlConnection;

module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection

  return {

   registerUserInDB: registerUserInDB,
   getUserFromCrentials: getUserFromCrentials,
   doesUserExist: doesUserExist
 }
}

function registerUserInDB(username, password, registrationCallback){

  //to register the user in the db
  const registerUserQuery = `INSERT INTO users (username, user_password) VALUES ('${username}', SHA('${password}'))`

  mySqlConnection.query(registerUserQuery, registrationCallback)
}

function getUserFromCrentials(username, password, callback) {

  //to get the user in the db
  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`

  console.log('getUserFromCrentials query is: ', getUserQuery);

  mySqlConnection.query(getUserQuery, (dataResponseObject) => {

      callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null)
  })
}

function doesUserExist(username, callback) {

  //to check if the user already exists
  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`

  const sqlCallback = (dataResponseObject) => {

      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

      //check if there are any users with this username and return the appropriate value
      callback(dataResponseObject.error, doesUserExist)
  }

  mySqlConnection.query(doesUserExistQuery, sqlCallback)
}
