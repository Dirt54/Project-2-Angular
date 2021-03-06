var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var clientPath = path.join(__dirname, '../client');
var mysql = require('mysql');

var api = require('./api');
var cookieParser = require('cookie-parser');
var configurePassport = require('./config/passport');

var prerender = require('prerender-node');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "blogboy",
    password: "blogger",
    database: "AngularBlog"
});

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);
// prerender.set('prerenderServiceUrl', 'http://localhost:1337/');
app.use(prerender);

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use(cookieParser());

configurePassport(app);

app.use('/api', api);

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0) { return false; }
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}

app.get('*', function(req, res, next) {
    if (isAsset(req.url)) {
        return next();    
    } else {        
        res.sendFile(path.join(clientPath, 'index.html'));    
    }
}); 


app.listen(7000);






