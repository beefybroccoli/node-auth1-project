const {findBy } = require("../users/users-model");
const {isUndefined} = require("../users/users-middleware");
const req = require("express/lib/request");

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  const {username} = req.body;
  if (isUndefined(username)){
    res.status(401).json({message:"Invalid username"});
  }else{
    const user = await findBy({username});
    if(isUndefined(user)){
      next();
    }else{
      res.status(422).json({message:"Username taken"});
    }
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  const {username} = req.body;
  const user = await findBy(username);
  if(isUndefined(user)){
    res.status(401).json({message:"Invalid credentials"});
  }else{
    req.user = user;
    next();
  }

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  const {password} = req.body;
  if (isUndefined(password) || typeof password !== 'string' || password.length < 3){
    res.status(422).json({message:"Password must be longer than 3 chars"});
  }else{
    next();
  }
}

module.exports = {checkPasswordLength, checkUsernameFree, checkUsernameExists}
