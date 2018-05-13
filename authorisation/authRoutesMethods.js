let userDBHelper

module.exports = injectedUserDBHelper => {

  userDBHelper = injectedUserDBHelper

  return {
    registerUser: registerUser,
    login: login
  }
}

function registerUser(req, res){

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

      //check if the user exists
      if (sqlError !== null || doesUserExist){

        const message = sqlError !== null ? "Operation unsuccessful" : "User already exists"

        const error =  sqlError !== null ? sqlError : "User already exists"

        sendResponse(res, message, sqlError)

        return
      }

      //register the user in the db
      userDBHelper.registerUserInDB(req.body.username, req.body.password, dataResponseObject => {

        const message =  dataResponseObject.error === null  ? "Registration was successful" : "Failed to register user"

        sendResponse(res, message, dataResponseObject.error)
      })
    })
  }

function login(registerUserQuery, res){


}

function sendResponse(res, message, error) {

        res
        .status(error !== null ? error !== null ? 400 : 200 : 400)
        .json({
             'message': message,
             'error': error,
        })
}
