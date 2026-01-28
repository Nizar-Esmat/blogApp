import express from 'express'
import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

const db = mysql.createConnection({
    host: dotenv.DB_HOST,
    user: dotenv.DB_USER,
    password: dotenv.DB_PASSWORD,
    database: dotenv.DB_NAME
})


db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})