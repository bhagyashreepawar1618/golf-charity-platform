import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

const registerUser = asyncHandler(async (req, res) => {
  //get details from user (frontend)
  //validation if email is correct -not empty fields
  //check if user already exists
  //check for images, check for avtar
  //upload them to cloudinary
  //create user object -crate entry in db
  //remove password and refreshtoken feild from response
  //check for user creation
  //return response

  const { fullname, email, username, password } = req.body;

  //validation
  if (fullname === '' || username === '' || password === '' || email === '') {
    throw new ApiError(400, 'All feilds are compulsory');
  }

  //if user is already registered
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  //throw an error
  if (existedUser) {
    throw new ApiError(409, 'User with email or username Already Exists...');
  }

  //console.log (req.files)
  const ProfileLocalPath = req.files?.ProfilePicture?.[0]?.path;

  if (!ProfileLocalPath) {
    throw new ApiError(400, 'Avtar file is required');
  }

  //after getting the local path uload them on cloudinary
  //use await because it is an time taking process
  const ProfilePicture = await uploadOnCloudinary(ProfileLocalPath);

  if (!ProfilePicture) {
    throw new ApiError(400, 'Profile picture is required');
  }

  //use .create method to store all in database
  //for this particular user all feilds are stores in user database

  const user = await User.create({
    fullname,
    ProfilePicture: ProfilePicture?.url,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  //if created user doesnot exists
  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering user');
  }

  return res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully...'));
});

export { registerUser };
