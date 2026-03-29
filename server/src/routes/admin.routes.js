import { Router } from 'express';
import {
  registerAdmin,
  loginAdmin,
  setCharity,
  getUsersWithCount,
  runDraw,
} from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/adminauth.middleware.js';

const router = Router();

router.route('/admin-register').post(
  upload.fields([
    {
      name: 'ProfilePicture',
      maxCount: 1,
    },
  ]),
  registerAdmin
);

router.route('/login-admin').post(loginAdmin);
router.route('/set-charity').post(
  upload.fields([
    {
      name: 'image',
      maxCount: 1,
    },
  ]),
  verifyJWT,
  setCharity
);

router.route('/get-all-users').get(verifyJWT, getUsersWithCount);
router.route('/run-draw').get(verifyJWT, runDraw);
export default router;
