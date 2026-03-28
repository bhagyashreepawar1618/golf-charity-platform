import { Router } from 'express';

import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controller.js';
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
export default router;
