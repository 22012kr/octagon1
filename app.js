/*const http = require("http");

http.createServer(function(request, response){
    response.end("Привет, Октагон!");
}).listen(3000, "localhost",function(){
    console.log("Сервер запущен");
});*/

const express = require("express");

const app = new express();

app.get("/", function(request, response)
{
    response.send("<h1>Привет, Октагон!<h1>");
});

app.listen(3000);