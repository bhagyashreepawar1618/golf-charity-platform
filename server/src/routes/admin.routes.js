import { Router } from 'express';
import { registerAdmin, loginAdmin } from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

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

export default router;
