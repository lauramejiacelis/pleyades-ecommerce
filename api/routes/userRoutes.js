import express from "express"
const router = express.Router()
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser } from "../controllers/userController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import validationMiddleware from "../middleware/validationMiddleware.js"
import loginSchema from '../schemas/loginSchema.js'
import registerSchema from '../schemas/registerSchema.js'

//Middlewares for admin

router.route('/').post(validationMiddleware(registerSchema),registerUser).get(protect, admin, getUsers)
router.post('/logout', logoutUser)
router.post('/login', validationMiddleware(loginSchema),authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser)

export default router;