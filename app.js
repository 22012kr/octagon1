const express = require("express");

const app = new express();

app.get("/", function(request, response)
{
    response.send("<h1>Привет, Октагон!<h1>");
});

app.use(express.json());

app.use("/static", function(request, response){
    response.json({header: "Hello",
        body: "Octagon NodeJs Test"
    });
});

app.use("/dynamic", function(request, response){
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;

    let arr = [a, b, c];

    for (i = 0; i < arr.length; ++i)
    {
        if (arr[i] == undefined || !Number(arr[i]))
        {
            response.json({header: "Error"}); break;
        } else continue;
    }

    const s = +a + +b + +c;
    response.json({header: "Calculated", 
        body: s});
});

app.listen(3000);