const express = require("express");
const mysql = require("mysql2");

const app = new express();
app.set('json spaces', 2);

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

app.use("/getAllItems", function(request, response){

    const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ChatBotTests",
    password: ""
    }).promise();

    conn.query("SELECT * FROM items")
    .then(result =>{
        return response.json(result[0]);
    })
    .catch(err => {
        console.log(err.message);
        return response.json({header: "Error"});
    })

    conn.end();
});

app.use("/addItem", function(request, response){
    const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ChatBotTests",
    password: ""
    }).promise();
    
    const name = request.query.name;
    const desc = request.query.desc;

    if (!name || name.trim() == '' || !desc || desc.trim() == '')
    {
        return response.json(null);
    }

    const inserts = [name, desc];
    const sql = "INSERT INTO items(`name`, `desc`) VALUES(?, ?)";

    conn.query(sql, inserts)
    .then(result =>{ 
        return response.json({name: name, desc: desc});
    }).catch(err => {
        return response.json(null);
    });
});

app.use("/deleteItem", function(request, response){
    const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ChatBotTests",
    password: ""
    }).promise();
    
    const id = request.query.id;

    if (!id || isNaN(id))
    {
        return response.json(null);
    }

    conn.query("DELETE FROM items WHERE `id` = ?", id)
    .then(result =>{
        if (result[0].affectedRows > 0){ 
            return response.json({deleted: id});
        }else{
            return response.json({});
        }
    }).catch(err => {
        return response.json({});
    });
    conn.end();
});

app.use("/updateItem", function(request, response){
    const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ChatBotTests",
    password: ""
    }).promise();
    
    const id = request.query.id;
    const name = request.query.name;
    const desc = request.query.desc;

    if (!id || isNaN(id) || !name || name.trim() == '' || !desc || desc.trim() == '')
    {
        return response.json(null);
    }

    const updates = [name, desc, id];
    const sql = "UPDATE items SET name = ? , `desc` = ? WHERE id = ?";

    conn.query(sql, updates)
    .then(result =>{
        if (result[0].affectedRows > 0){ 
            return response.json({id: id, name: name, desc: desc});
        }else{
            return response.json({});
        }
    }).catch(err => {
        return response.json({});
    });
    conn.end();
});

app.listen(3000);