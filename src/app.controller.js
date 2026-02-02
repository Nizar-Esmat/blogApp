import usersService from './modules/auth/auth.controller.js'
import blogsService from './modules/blog/blog.controller.js'
import authService from './modules/auth/auth.controller.js'
const bootStrap = (app, exoress) => {
    //why i call the json function with () ? 
    //beacause it is a middleware it must return  the next function

    app.use(exoress.json())
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    // auth router
    app.use('/auth', authService)
    app.use('/user', usersService)
    app.use('/blog', blogsService)
}

export default bootStrap