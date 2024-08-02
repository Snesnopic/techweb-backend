const express = require('express');
const QuizController = require('../controllers/QuizController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/quizzes', authMiddleware, QuizController.createQuiz);
router.get('/quizzes/:id', QuizController.getQuiz);
router.get('/quizzes/:quizId/answers', authMiddleware, QuizController.getQuizAnswers);
router.delete('/quizzes/:id', authMiddleware, QuizController.deleteQuiz);


module.exports = router;
