/**
 * Created by hengl on 04/05/2017.
 */

let express = require("express");
let app = express();
app.get("/api/1", (req, res, next) => {
    let json = '{"listId":55555}';
    res.json(JSON.parse(json));
})

app.get("*", (req, res) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end("404 error!\n");
});

app.listen('3020');
