const session = require('express-session');
const Store = require("connect-session-knex")(session);

const sessionName = "chocolatechip";

const secretKey = "secret key";

const sessionConfig = {
    name: sessionName,
    secret : process.env.SESSION_SECRET || secretKey,
    cookie :{
        maxAge : 1 * 24 * 60 * 60 * 1000,
        secure : false, //set true when only use https protocol, set false to use http protocol
    },
    httpOnly: true, //don't let JS code access cookies
    resave: false,
    saveUninitialized: false,
    rolling: true, //push back logout date
    store: new Store({
        knex: require("../data/db-config"),
        tablename:'sessions',
        sidfieldname:'sid',
        createtable:true,
        clearInterval: 1000 * 60 * 60,
    })
};

module.exports = {sessionConfig, sessionName, secretKey};
