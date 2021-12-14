const {findById} = require("./users-model");

async function verifyUserId (req, res, next){
    const {id} = req.params;
    console.log("id = ", id);
    if(isUndefined(id) || Number.isInteger(Number(id)) === false){
        res.status(400).json({message:
            "invalid id"});
    }
    else{
      const user = await findById(id);
      if (isUndefined(user)){
        res.status(404).json({message:`id ${id} not found`});
      }else{
        req.user = user;
        next();
      }
    }
}

function isUndefined(input){
    return typeof input === 'undefined';
}

module.exports = {verifyUserId, isUndefined};