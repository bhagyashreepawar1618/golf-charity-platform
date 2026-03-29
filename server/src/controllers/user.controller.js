import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../middlewares/multer.middleware.js';
import { Charity } from '../models/charity.model.js';

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
  const { fullname, email, username, password } = req.body;

  if (!fullname || !username || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }

  if (!req.file) {
    throw new ApiError(400, 'Profile picture is required');
  }

  let cloudinaryResult;
  try {
    cloudinaryResult = await uploadOnCloudinary(req.file.buffer, 'profiles');
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new ApiError(500, 'Failed to upload profile picture');
  }

  const user = await User.create({
    fullname,
    email,
    username: username.toLowerCase(),
    password,
    ProfilePicture: cloudinaryResult.secure_url,
  });

  const createdUser = await User.findById(user._id).select('-password -refreshToken');

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering user');
  }

  return res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully'));
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
  const loggedInUser = await User.findById(user._id)
    .select('-password -refreshToken ')
    .populate('charity');

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
  const user = await User.findById(req.user._id).select('-password').populate('charity');
  return res.status(200).json(new ApiResponse(200, user, 'User fetched successfully'));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  //take new details from user
  const { username, email, fullname } = req.body;

  //validation
  if (!username || !email || !fullname) {
    throw new ApiError(400, 'all feilds are compulsory..');
  }

  const ProfilePictureLocalPath = req.files?.ProfilePicture?.[0]?.path;
  console.log('PP=', ProfilePictureLocalPath);

  if (!ProfilePictureLocalPath) {
    throw new ApiError(400, 'Profile Picture is required ');
  }

  const ProfilePicture = await uploadOnCloudinary(ProfilePictureLocalPath);

  //after getting all details
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
        username,
        ProfilePicture: ProfilePicture?.url,
      },
    },
    {
      new: true,
    }
  ).select('-password');

  return res.status(200).json(new ApiResponse(200, user, 'User details are updated successfully'));
});

const setSubscriptionDetails = asyncHandler(async (req, res) => {
  //get data from user
  const { status, plan, expiryDate } = req.body;

  console.log('data=', status, plan);

  //validation
  if (status === undefined || !plan || !expiryDate) {
    throw new ApiError(400, 'All fields are required');
  }

  //after getting feilds store them in data base
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        subscription: {
          status,
          plan,
          expiryDate,
        },
      },
    },
    { new: true }
  );

  if (!user) {
    throw new ApiError(400, 'Something went wrong while storing subscription details');
  }

  //if stored successfully then send response
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'subscription details stored successfully..!!'));
});

const getCharitiesDetails = asyncHandler(async (req, res) => {
  const charities = await Charity.find({ isActive: true }).sort({ createdAt: -1 });

  if (!charities) {
    throw new ApiError(404, 'No charities found');
  }

  return res.status(200).json(new ApiResponse(200, charities, 'Charities fetched successfully'));
});

const selectCharity = asyncHandler(async (req, res) => {
  const { charityId, charityPercentage } = req.body;

  // validation
  if (!charityId || !charityPercentage) {
    throw new ApiError(400, 'All fields are required');
  }

  if (charityPercentage < 10) {
    throw new ApiError(400, 'Minimum contribution is 10%');
  }

  // check charity exists
  const charity = await Charity.findById(charityId);

  if (!charity) {
    throw new ApiError(404, 'Charity not found');
  }

  // update user
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        charity: charityId,
        charityPercentage: charityPercentage,
      },
    },
    { new: true }
  ).populate('charity');

  return res.status(200).json(new ApiResponse(200, user, 'Charity selected successfully'));
});

const addScore = asyncHandler(async (req, res) => {
  //take score from user
  const { score } = req.body;

  if (!score || score < 1 || score > 45) {
    throw new ApiError(400, 'Invalid Score');
  }

  const user = await User.findById(req.user._id);

  if (user.scores.length >= 5) {
    user.scores.shift(); //removes oldest score
  }

  user.scores.push({
    value: score,
    date: new Date(),
  });

  await user.save();

  return res.status(200).json(new ApiResponse(200, user.scores, 'Score added successfully'));
});

const getScore = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user.scores, 'scores fetched successfully'));
});
export {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  setSubscriptionDetails,
  getCharitiesDetails,
  selectCharity,
  addScore,
  getScore,
};
