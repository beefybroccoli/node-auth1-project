// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const express = require('express')
const router = express.Router();
const {find, findBy, findById, add} = require("./users-model");
const {verifyUserId, verifyUndefined: isUndefined} = require("./users-middleware");

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

  router.get("", async (req, res, next)=>{
    try{
      const array = await find();
      res.status(200).json(array);
    }catch(err){
      next(err);
    }
  })

  router.get("/:id", verifyUserId, async (req, res, next)=>{
    try{
      res.status(200).json(req.user);
    }catch(err){
      next(err);
    }
  })

  module.exports = router;

// Don't forget to add the router to the `exports` object so it can be required in other modules
