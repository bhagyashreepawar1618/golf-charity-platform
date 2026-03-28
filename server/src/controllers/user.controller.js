import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    //user Instance
    const user = await User.findById(userId);
    //we've got all the properties in user (user is an object)

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.accessToken = accessToken;

    //directly save in database without validation
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong While generating Refresh and Access Token');
  }
};

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

const loginUser = asyncHandler(async (req, res) => {
  //take inputs from
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, 'username is required');
  }

  const user = await User.findOne({ username });

  const isPassValid = await user.isPasswordCorrect(password);

  if (!isPassValid) {
    throw new ApiError(401, 'Invalid user Credentials');
  }

  //if password is correct generate refresh and accesstokens
  //from user Instance we can get access of _id attribute
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  console.log('access token is= ', accessToken);

  //remove password and refresh token then send the response (send accessToken and other info)
  const loggedInUser = await User.findById(user._id).select('-password -refreshToken ');

  //it can be only modified in server
  //response

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
        refreshToken,
      },
      'User logged in successfully'
    )
  );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, 'User fetched successfully'));
});
export { registerUser, loginUser, getCurrentUser };
