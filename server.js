import express from 'express'
import mysql from 'mysql2'

const app = express()
const port = 3000

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blogapp'
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