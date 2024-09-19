import {getAllUsers, getUserByUsername, deleteUser, editUser} from '../controllers/userController'
import isLoggedIn from '../middleware/isLoggedIn'
import Router from 'express'

const router = Router()

router.get('/', isLoggedIn, getAllUsers)

router.get('/:username', isLoggedIn, getUserByUsername)

// router.post('/newUser', createUser)

router.put('/:id', isLoggedIn, editUser)

router.delete('/:id', isLoggedIn, deleteUser)

export default router