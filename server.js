
let express = require('express');
let app = express();
let routes = require('./routes')(app);
// let http = require('http');


let port = 3010;
app.listen(port);

// http.createServer(app).listen(port);