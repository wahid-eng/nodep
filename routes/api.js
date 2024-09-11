import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

export default router;