const express = require("express");

const app = new express();

app.get("/", function(request, response)
{
    response.send("<h1>Привет, Октагон!<h1>");
});

app.listen(3000);