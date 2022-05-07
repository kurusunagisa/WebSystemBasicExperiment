const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('library.db');

app.set('view engine', 'ejs');

//借りられている本の一覧
app.get("/rent", (req, res) => {
    const user_id = req.query.user_id;
    const book_id = req.query.book_id;
    let sql;
    if (user_id == undefined && book_id == undefined) {
        sql = "SELECT rent.id, user.name AS user_name, book.name AS book_name FROM rent INNER JOIN user ON user.id=rent.user_id INNER JOIN book ON book.id=rent.book_id WHERE rent.rent_flag=1;";
    } else if (user_id == undefined && book_id != undefined) {
        sql = "SELECT rent.id, user.name AS user_name, book.name AS book_name FROM rent INNER JOIN user ON user.id=rent.user_id INNER JOIN book ON book.id=rent.book_id WHERE rent.rent_flag=1 AND rent.book_id="+ book_id +";";
    } else if (user_id != undefined && book_id == undefined) {
        sql = "SELECT rent.id, user.name AS user_name, book.name AS book_name FROM rent INNER JOIN user ON user.id=rent.user_id INNER JOIN book ON book.id=rent.book_id WHERE rent.rent_flag=1 AND rent.user_id="+ user_id + ";";
    } else {
        sql = "SELECT rent.id, user.name AS user_name, book.name AS book_name FROM rent INNER JOIN user ON user.id=rent.user_id INNER JOIN book ON book.id=rent.book_id WHERE rent.rent_flag=1 AND rent.user_id="+ user_id +" AND rent.book_id="+ book_id +";";
    }
    console.log(sql)
    db.serialize(() => {
        db.all(sql, (error, row) => {
            if (error) {
                res.render('show', {
                    mes: "sqliteがエラーを返しました。"
                });
            }
            console.log(row);
            res.render('rent', { data: row });
        });
    });
});

//本の一覧
app.get("/book", (req, res) => {
    const sql = "SELECT book.id, book.name AS book_name, user.name AS user_name, book.total, book.current FROM book INNER JOIN user ON user.id=book.owner_id;";
    db.serialize(() => {
        db.all(sql, (error, row) => {
            if (error) {
                res.render('show', {
                    mes: "sqliteがエラーを返しました。"
                });
            }
            console.log(row);
            res.render('book', { data: row });
        });
    });
});

app.get("/", (req, res) => {
    const message = "Hello, World!!!";
    res.render('show',{mes:message});
});

app.listen(3000, () => console.log("Express"));