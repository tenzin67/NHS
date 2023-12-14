
const router =express.Router()

import express from 'express'
import {register,login} from '../Controllers/authController.js'

router.post('/register', register)
router.post('/login', login  )



export  default router