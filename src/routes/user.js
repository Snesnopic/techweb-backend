const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/me', UserController.getUser);

router.get('/my-quizzes', authMiddleware, UserController.getUserQuizzes);
router.get('/answered-quizzes', authMiddleware, UserController.getQuizzesWithUserAnswers);

module.exports = router;
