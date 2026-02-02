import { Router } from "express"
import authServies from "./auth.service.js"

const router = Router()
router.post('/register', authServies.register )


router.post('/login', authServies.login )


export default router