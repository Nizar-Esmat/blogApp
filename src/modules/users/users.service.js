import db from '../../db/db.Connection.js'
const getProfile = (req, res) => {
    const { id } = req.params
    db.execute(`select * from users where id = ? `, [id], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error', err })
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ message: 'User fetched successfully', results })
    })
}
export default { getProfile }