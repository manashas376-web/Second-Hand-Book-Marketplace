const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2006",
    database: "bookdb"
});
db.connect((err) => {
if (err) {
        console.log("Database Error:", err.message);
    } else {
        console.log("Database Connected");
    }
});
app.post("/buy", (req, res) => {

    let name = req.body.name;
    let phone = req.body.phone;
    let book = req.body.book;
    let price = req.body.price;

    let sql = `
        INSERT INTO buyers
        (name, phone, book, price, date)
        VALUES (?, ?, ?, ?, CURDATE())
    `;

    db.query(sql, [name, phone, book, price], (err) => {

        if (err) {
            console.log("Insert Error:", err.message);
            res.send("Error");
        } else {
            res.send("Success");
        }

    });

});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});