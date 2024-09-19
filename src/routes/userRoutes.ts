import {getAllUsers, getUserByUsername, deleteUser, editUser} from '../controllers/userController'
import isLoggedIn from '../middleware/isLoggedIn'
import Router from 'express'

const router = Router()

router.get('/', isLoggedIn, getAllUsers)

router.get('/:username', getUserByUsername)

// router.post('/newUser', createUser)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)

export default router