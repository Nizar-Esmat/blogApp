import { Router } from "express";
import * as userService from './users.service.js'
const router = Router()

router.get('/profile/:id', userService.getProfile)