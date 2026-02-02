import db from '../../db/db.Connection.js'
const addBlog = (req, res) => {
    const { title, content, userId } = req.body
    db.execute(`insert into blogs (title, content , user_id) values (? , ?  , ?)`, [title, content, userId], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Internal server error', err })
        }
        if (results.affectedRows === 0) {
            return res.status(500).json({ message: 'Internal server error' })
        }
        res.status(201).json({ message: 'Blog created successfully', results })
    })
}


const deleteBlog = (req, res) => {
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

}

const getUserBlogs = (req, res) => {
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
}

export default { addBlog, deleteBlog, getUserBlogs }