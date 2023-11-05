import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'Admin@123',
    database: 'testschema'
})

app.get('/', (req, res)=> {
    return res.json("from backend");
})

app.get('/books', (req, res)=>{
    const sql = "select * from books";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})


app.listen(8800, ()=>{
    console.log("listening");
}) 