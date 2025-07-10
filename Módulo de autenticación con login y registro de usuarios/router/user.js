import express from 'express'
import { create_user, login, checkEmail, verifyAuth, logout,  } from '../controllers/user.js'

const router = express.Router()

router.post('/create', create_user)
router.post('/login', login)
router.get('/check-email', checkEmail)
router.get('/verify-auth', verifyAuth)
router.post('/logout', logout)


export default router

