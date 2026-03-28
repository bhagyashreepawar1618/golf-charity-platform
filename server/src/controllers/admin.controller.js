import ApiError from '../utils/ApiErrors.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { Admin } from '../models/admin.model.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

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
export { registerAdmin, loginAdmin };
