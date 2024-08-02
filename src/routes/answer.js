const express = require('express');
const AnswerController = require('../controllers/AnswerController');
const authMiddleware = require('../middleware/auth');
const sessionMiddleware = require('../middleware/session');

const router = express.Router();

router.post('/answers', sessionMiddleware, AnswerController.submitAnswer);
router.get('/answers', AnswerController.getAnswers);

module.exports = router;
