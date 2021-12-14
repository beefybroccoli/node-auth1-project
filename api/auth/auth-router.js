// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const {checkPasswordLength,checkUsernameExists,checkUsernameFree, comparePassword} = require("./auth-middleware");
const express = require("express");
const router = express.Router();
const {add} = require("../users/users-model");
const {} = require("../users/users-middleware");

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
router.post("/register", checkUsernameFree, checkPasswordLength, async (req, res, next) =>{
  try{
    const newUser = await add(req.user);
    res.status(201).json(newUser);
  }catch(err){
    next(err);
  }
})


/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */
router.post("/login", checkUsernameExists, checkPasswordLength, comparePassword, async (req, res, next) =>{
  try{
    res.status(200).json({message:`Welcome sam`});
    //${req.user.username}
  }catch(err){
    next(err);
  }
})


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */
  router.post("/logout", async (req, res, next) =>{
    try{
      res.status(503).json({message:"reached POST /api/auth/logout"});
    }catch(err){
      next(err);
    }
  })
 
module.exports = router;