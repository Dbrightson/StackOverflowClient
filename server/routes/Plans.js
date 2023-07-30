import express from 'express'
import getCurrentPlan from '../utilities/getCurrentPlan'
import getNoOfQuestions from '../utilities/getNoOfQuestions'

const router = express.Router()

router.post('/getCurrentPlan',getCurrentPlan)
router.post('/getNoOfQuestions',getNoOfQuestions)

export default router