const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const jwt = require('jsonwebtoken');
const { Answer, User } = require('../models');

class QuizController {
  static async createQuiz(req, res) {
    try {
      const { title, description, questions, maxErrors } = req.body;
      const token = req.header('Authorization')?.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Create the quiz
      const quiz = await Quiz.create({ title, description, UserId: decoded.id, maxErrors });
  
      // Create each question and associated answers
      for (const questionData of questions) {
        // Create the question
        await Question.create({ 
          answers: questionData.answers,
          question: questionData.questionText, 
          correctanswer: questionData.correctAnswer,
          QuizId: quiz.id 
        });
      }
  
      res.status(201).json(quiz);
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }
  

  static async getQuizzes(req, res) {
    try {
      const quizzes = await Quiz.findAll({ include: [Question] });
      res.json(quizzes);
    } catch (error) {
      console.log("Error=".concat(error))
      res.status(500).json({ message: error.message });
    }
  }
  static async getQuiz(req,res) {
    try {
      const quiz = await Quiz.findByPk(req.params.id, {
        include: {
          model: Question,
          include: [Answer]
        }
      });
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteQuiz(req, res) {

    try {
      const quizId = req.params.id;
      const token = req.header('Authorization')?.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const quiz = await Quiz.findByPk(quizId, {
        include: [{ model: User, attributes: ['id'] }]
      });
  
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

      if (quiz.UserId != decoded.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
        await quiz.destroy();
        return res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.log("Error".concat(error))
        return res.status(500).json({ message: 'Failed to delete quiz', error });
    }
}

 // Function to get all answers of a quiz (only permitted to the creator of that quiz)
static async getQuizAnswers(req, res) {
  try {
    const { quizId: QuizId } = req.params;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const quiz = await Quiz.findByPk(QuizId, {
      include: [{ model: User, attributes: ['id'] }]
    });

    if (quiz.UserId !== decoded.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const questionsWithAnswers = await Question.findAll({
      where: { QuizId },
      include: [
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ]
    });
    // Restructure the data to group answers by question and quiz
    const response = questionsWithAnswers.map(question => ({
      question: question.question,
      correctAnswer: question.correctanswer,
      answers: question.Answers.map(answer => ({
        givenAnswer: answer.givenanswer,
        user: answer.User ? answer.User.username : answer.nickname,
        sessionId: answer.sessionId,
        createdAt: answer.createdAt
      }))
    }));

    res.status(200).json(response);
  } catch (error) {
    console.log("Error=", error);
    res.status(500).json({ message: error.message });
  }
}


}


module.exports = QuizController;
