import { Router } from "express"
import blogService from "./blog.service.js"

const router = Router()

router.post('/', blogService.addBlog)

router.delete('/:id', blogService.deleteBlog)

router.get('/:id', blogService.getUserBlogs)

export default router