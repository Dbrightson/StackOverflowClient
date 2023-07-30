import express from 'express'
import searchStackOverflow from '../controllers/searchStackOverflow'

const router = express.Router()

router.post('/stackoverflow',searchStackOverflow)

export default router