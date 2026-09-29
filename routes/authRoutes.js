import { Router } from 'express';
import {
  getLoginPage,
  getRegisterPage,
  getForgotPasswordPage,
  registerUser,
  loginUser,
  logoutUser
} from '../controllers/authController.js';
import { isGuest, isAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/login', isGuest, getLoginPage);
router.post('/login', isGuest, loginUser);

router.get('/register', isGuest, getRegisterPage);
router.post('/register', isGuest, registerUser);

router.get('/forgot-password', isGuest, getForgotPasswordPage);

router.post('/logout', isAuthenticated, logoutUser);

export default router;
