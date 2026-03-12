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

     for (let i = 0; i < arr.length; i++) {
        if (arr[i] === undefined || arr[i] === null || arr[i] === '') {
            return response.json({ header: "Error"});
        }
        
        const num = Number(arr[i]);

        if (isNaN(num)) {
            return response.json({ header: "Error"});
        }

        arr[i] = num;
    }

    const s = arr[0] + arr[1] + arr[2];
    response.json({header: "Calculated", 
        body: s});
});

app.listen(3000);