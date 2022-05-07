const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

app.set('view engine', 'ejs');

//借りられている本の一覧
app.get("/rent", (req, res) => {
    
});

//本の一覧
app.get("/book", (req, res) => {
    const sql = "SELECT * FROM book;";
    db.serialize(() => {
        db.all(sql, (error, row) => {
            if (error) {
                res.render('show', {
                    mes: "sqliteがエラーを返しました。"
                });
            }
            res.render('db', { data: row });
        });
    });
});

app.get("/", (req, res) => {
    const message = "Hello, World!!!";
    res.render('show',{mes:message});
});

app.listen(3000, () => console.log("Express"));