import { Router } from 'express';

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserProfile,
  setSubscriptionDetails,
  getCharitiesDetails,
  selectCharity,
  addScore,
  getScore,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: 'ProfilePicture',
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route('/login').post(loginUser);
router.route('/get-current-user').get(verifyJWT, getCurrentUser);
router.route('/update-user-profile').post(
  upload.fields([
    {
      name: 'ProfilePicture',
      maxCount: 1,
    },
  ]),
  verifyJWT,
  updateUserProfile
);
router.route('/set-subscription-details').post(verifyJWT, setSubscriptionDetails);
router.route('/get-charities').get(verifyJWT, getCharitiesDetails);
router.route('/select-charity').post(verifyJWT, selectCharity);
router.route('/add-score').post(verifyJWT, addScore);
router.route('/get-scores').get(verifyJWT, getScore);
export default router;
