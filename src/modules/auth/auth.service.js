import db from '../../db/db.Connection.js'
const register = (req, res) => {
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
}

const login = (req, res) => {
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
}

export default { register, login }