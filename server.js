import express from 'express'
import mysql from 'mysql2'

import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
//why i call the json function with () ? 
//beacause it is a middleware it must return  the next function

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/register', (req, res) => {
    const { fname, lname, email, dob, password } = req.body
    // we use exuctue to make the prepared statement(that check availability of the data)
    db.execute(`SELECT * FROM users WHERE email = ?`, [email], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error' })
        } else {
            if (results.length > 0) {
                return res.status(400).json({ message: 'User already exists' })
            }
        }
    })

    db.execute(`INSERT INTO users (fname, lname, email, dob, password) 
        VALUES (?, ?, ?, ?, ?)`,
        [fname, lname, email, dob, password],
        (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: 'Internal server error', err })
            } else {
                if (res.effectedRows === 0) {
                    return res.status(500).json({ message: 'Internal server error' })
                }
                res.status(201).json({ message: 'User created successfully', results })
            }
        })
})
app.post('/login', (req, res) => {
    const { email, password } = req.body

    db.execute(`SELECT * from users where email = ? and password = ?`, [email, password], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error', err })
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'invalid credentials' })
        }
        const user = results[0]
        if (results.length > 0) {
            return res.status(200).json({ message: 'User logged in successfully', results })
        }
    })
})
app.post('/blog', (req, res) => {
    const { title, content, userid } = req.body
    db.execute(`insert into blogs (title, content , user_id) values (? , ?  , ?)`, [title, content, userid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error', err })
        }
        if (results.affectedRows === 0) {
            return res.status(500).json({ message: 'Internal server error' })
        }
        res.status(201).json({ message: 'Blog created successfully', results })
    })
})
app.delete('/blog/:id', (req, res) => {
    const { id } = req.params
    //soft delete
    db.execute(`update blogs set is_deleted = 1 where id = ? and is_deleted = 0`, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error', err })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Blog not found' })
        }
        res.status(200).json({ message: 'Blog deleted successfully', results })
    })

})
app.get('/blogs/:id', (req, res) => {
    const { id } = req.params


    const query = `
        select  u.id as userId 
        , b.id as blogId 
        , CONCAT(fname , " " , lname) as fullName
        , title
        , content 
        , DATEDIFF(now() , u.dob) / 365.25  as age

        from blogs as b
        join users as u
        on u.id = b.user_id
        where b.is_deleted = 0 and u.id = ?`

    const values = [id]
    db.execute( 
        query
        , values
        , (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({ message: 'Internal server error', err })
            }

            res.status(200).json({ message: 'Blogs fetched successfully', results })
        })
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