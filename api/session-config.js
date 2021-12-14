const sessionName = "monkey";

const secretKey = "secret key";

const sessionConfig = {
    name: sessionName,
    secret : secretKey,
    cookie :{
        maxAge : 1 * 24 * 60 * 60 * 1000,
        secure : false, //set true when only use https protocol, set false to use http protocol
    },
    httpOnly: true, //don't let JS code access cookies
    resave: false,
    saveUninitialized: false,
};



module.exports = {sessionConfig, sessionName, secretKey};