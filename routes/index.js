/**
 * Created by hengl on 04/05/2017.
 */
let requestHttp = require('request');

let username = 'RestService';
let password = 'Service1';

let getResponseForAllList = (response, callback) => {
    let options = {
        url: 'http://labelmanagementsolution.eu-gb.mybluemix.net/rest/getalllists?customerId=0311877&contenttype=json',
        method: 'GET',
        auth: {
            user: username,
            password: password
        }
    };
    requestHttp(options, function (err, res, body) {
        callback(body);
    });
}

let getDelOpt = (request) => {
    let url = require('url');
    let url_parts = url.parse(request.url, true);
    let queryStr = url_parts.search;
    let newURL = `http://labelmanagementsolution.eu-gb.mybluemix.net/rest/deleteList${queryStr}&customerId=0311877`;
    let delOpt = {
        url: newURL,
        method: "DELETE",
        auth: {
            user: username,
            password: password
        }
    }
    return delOpt;
}

let processDelList = (request, response, callback) => {
    let delOptObj = getDelOpt(request);
    requestHttp.del(delOptObj,function(err,resp,bd){
        console.log("start deleting");
        if(err){
            console.log(err);
        }else{
            console.log('now fetch list after deleting');
            getResponseForAllList(response, function(data){
                response.json(JSON.parse(data));
            });
        }
    });
}

module.exports = (app)=> {
    app.get('/api/getAllLists', (request, response) => {
        getResponseForAllList(response, function(data){
            response.json(JSON.parse(data));
        });
    })

    app.delete('/api/deleteList', (request, response) => {
        processDelList(request, response, function(data){
            response.json(JSON.parse(data));
        })

    })
}



/*
app.use(function(request, response, next) {
    console.log(request.url);
    if (request.url == "/api/getAllLists"){
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Load list successful");
        next();
    } else {
        console.log(request.url);
    }
});

app.use((resquest, response) => {
    console.log("test middleware");
});
*/
