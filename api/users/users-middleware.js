function verifyUserId (req, res, next){
    const {id} = req.params;
    console.log("id = ", id);
    if(verifyUndefined(id) || Number.isInteger(Number(id)) === false){
        res.status(400).json({message:
            "invalid id"});
    }
    else{
        next();
    }
}

function verifyUndefined(input){
    return typeof input === 'undefined';
}

module.exports = {verifyUserId, verifyUndefined};