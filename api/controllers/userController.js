import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access Public
const authUser = asyncHandler(async(req, res) => {
  console.log(req.body)
  const { email, password }= req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))){
    generateToken(res, user._id)

    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error ('Invalid email or password')
  }

  //res.send('auth user')
})

//@desc   Register user
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
  const { name, lastname, email, password } = req.body;

  const userExists = await User.findOne({email})

  if (userExists){
    res.status(400);
    throw new Error('user already exists')
  }

  const user =  await User.create({
    name, lastname, email, password
  });

  if(user){
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

//@desc   Logout user / clear cookie
//@route  POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: 'Logged out succesfully' })
})

//@desc   Get user profile
//@route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc   Update user profile (no id cause will use token)
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(user){
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    if (req.body.password){
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
    
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})

//@desc   Get users
//@route  GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async(req, res) => {
  res.send('get users')
})

//@desc   Get users by id
//@route  GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async(req, res) => {
  res.send('get user by id')
})

//@desc   Delete users
//@route  DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
  
  res.send('delete users')
})

//@desc   Update users
//@route  PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async(req, res) => {
  res.send('update users')
})

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser }