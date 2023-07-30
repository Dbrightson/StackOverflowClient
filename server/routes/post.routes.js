import express from 'express'
import {requireSignin} from '../controllers/auth'
import {userByID} from '../controllers/users'
import postCtrl from '../controllers/post'

const router = express.Router()

router.route('/new/:userId')
  .post(requireSignin, postCtrl.create)

router.route('/photo/:postId')
  .get(postCtrl.photo)

router.route('/by/:userId')
  .get(requireSignin, postCtrl.listByUser)

router.route('/feed/:userId')
  .get(requireSignin, postCtrl.listNewsFeed)

router.route('/like')
  .put(requireSignin, postCtrl.like)
router.route('/unlike')
  .put(requireSignin, postCtrl.unlike)

router.route('/comment')
  .put(requireSignin, postCtrl.comment)
router.route('/uncomment')
  .put(requireSignin, postCtrl.uncomment)

router.route('/:postId')
  .delete(requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userByID)
router.param('postId', postCtrl.postByID)

export default router
