import express from 'express'
import {
    login,
    signup,
    signout,
    requireSignin,
    hasAuthorization} from '../controllers/auth'
import {
    getAllUsers,
    updateProfile,
    create,
    userByID,
    read,
    list,
    remove,
    update,
    photo,
    defaultPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople} from '../controllers/users'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/signout',signout)
router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.route('/create')
  .get(list)
  .post(create)

router.route('/photo/:userId')
  .get(photo, defaultPhoto)
router.route('/defaultphoto')
  .get(defaultPhoto)

router.route('/follow')
    .put(requireSignin, addFollowing, addFollower)
router.route('/unfollow')
    .put(requireSignin, removeFollowing, removeFollower)

router.route('/findpeople/:userId')
   .get(requireSignin, findPeople)

router.route('/:userId')
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove)

router.param('userId', userByID)

export default router