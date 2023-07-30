import express from 'express'

import {postAnswer,deleteAnswer,addReply} from '../controllers/Answers.js'
import auth from '../middlewares/auth.js'
const router = express.Router()

router.patch('/post/:id', auth,postAnswer)
router.patch('/delete/:id', auth,deleteAnswer)
router.patch('/reply/:id', auth,addReply)

export default router