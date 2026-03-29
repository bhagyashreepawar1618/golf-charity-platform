import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Admin } from '../models/admin.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import { Charity } from '../models/charity.model.js';
import { User } from '../models/user.model.js';

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    //user Instance
    const admin = await Admin.findById(adminId);
    //we've got all the properties in user (user is an object)

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    admin.accessToken = accessToken;

    //directly save in database without validation
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong While generating Refresh and Access Token');
  }
};
const registerAdmin = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  //validation
  if (fullname === '' || username === '' || password === '' || email === '') {
    throw new ApiError(400, 'All feilds are compulsory');
  }

  //if user is already registered
  const existedAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  //throw an error
  if (existedAdmin) {
    throw new ApiError(409, 'Admin with email or username Already Exists...');
  }

  //console.log (req.files)
  const ProfileLocalPath = req.files?.ProfilePicture?.[0]?.path;

  if (!ProfileLocalPath) {
    throw new ApiError(400, 'profile file is required');
  }

  //after getting the local path uload them on cloudinary
  //use await because it is an time taking process
  const ProfilePicture = await uploadOnCloudinary(ProfileLocalPath);

  if (!ProfilePicture) {
    throw new ApiError(400, 'Profile picture is required');
  }

  //use .create method to store all in database
  //for this particular user all feilds are stores in user database

  const admin = await Admin.create({
    fullname,
    ProfilePicture: ProfilePicture?.url,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdAdmin = await Admin.findById(admin._id).select('-password -refreshToken');

  //if created user doesnot exists
  if (!createdAdmin) {
    throw new ApiError(500, 'Something went wrong while registering user');
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmin, 'Admin registered successfully...'));
});

const loginAdmin = asyncHandler(async (req, res) => {
  console.log('You are in admin login ');
  //take inputs from
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, 'username is required');
  }

  const admin = await Admin.findOne({ username });

  if (!admin) {
    throw new ApiError(404, 'Admin not found');
  }

  const isPassValid = await admin.isPasswordCorrect(password);

  if (!isPassValid) {
    throw new ApiError(401, 'Invalid Admin Credentials');
  }

  //if password is correct generate refresh and accesstokens
  //from user Instance we can get access of _id attribute
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id);

  console.log('access token is= ', accessToken);

  //remove password and refresh token then send the response (send accessToken and other info)
  const loggedInAdmin = await Admin.findById(admin._id).select('-password -refreshToken ');

  //it can be only modified in server
  //response

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        admin: loggedInAdmin,
        accessToken,
        refreshToken,
      },
      'User logged in successfully'
    )
  );
});

const setCharity = asyncHandler(async (req, res) => {
  //take details from admin
  const { name, description } = req.body;

  //validation
  if (!name || !description) {
    throw new ApiError(400, 'all feilds are required');
  }

  const imageLocalPath = req.files?.image?.[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, 'Image is required');
  }

  //after getting image upload it on cloudinary
  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image) {
    throw new ApiError(500, 'something went wrong while uploading on cloudinary');
  }

  //after uploading successfully store in database
  const charity = await Charity.create({
    name,
    description,
    image: image?.url,
  });

  if (!charity) {
    throw new ApiError(500, 'something went wrong while storing details in database');
  }

  console.log('before response');
  return res.status(200).json(new ApiResponse(200, charity, 'Charity Details stored successfully'));
});

const getUsersWithCount = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -refreshToken').populate('charity');
  const totalUsers = await User.countDocuments();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        users,
      },
      'Users fetched successfully'
    )
  );
});

const getsubscriptionDeatilsAndCount = asyncHandler(async (req, res) => {});

const runDraw = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users.length) {
    throw new ApiError(404, 'No users found');
  }

  // generate 5 random numbers (1-45)
  const drawNumbers = [];
  while (drawNumbers.length < 5) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!drawNumbers.includes(num)) {
      drawNumbers.push(num);
    }
  }

  let winners = [];

  // check each user
  users.forEach((user) => {
    const userScores = user.scores?.slice(-5).map((s) => s.value);

    if (!userScores || userScores.length < 5) return;

    const matches = userScores.filter((num) => drawNumbers.includes(num));

    if (matches.length >= 3) {
      winners.push({
        userId: user._id,
        name: user.fullname,
        matches: matches.length,
        numbers: userScores,
      });
    }
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        drawNumbers,
        winners,
      },
      'Draw completed '
    )
  );
});

export {
  registerAdmin,
  loginAdmin,
  setCharity,
  getUsersWithCount,
  getsubscriptionDeatilsAndCount,
  runDraw,
};
