import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiErrors.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    //if token is not there throw an error

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded token=', decodedToken);

    //now we have the data (_id) so we can get the instance
    const user = await User.findById(decodedToken?._id).select(' -password -refreshToken');

    //if user not found
    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    //  if user is present
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid AccessToken');
  }
});
