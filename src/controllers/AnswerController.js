const Answer = require("../models/Answer");
const jwt = require("jsonwebtoken");

class AnswerController {
  static async submitAnswer(req, res) {
    try {
      const { quizId, answers } = req.body;
      const token = req.header("Authorization")?.replace("Bearer ", "");
      let decoded = null;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        // This probably just means that the user isn't logged in, and should answer as Anonymous
        console.log("Error:".concat(error));
      }
      let userId = null;
      if (decoded != undefined && decoded.id != undefined) {
        userId = decoded.id;
      }
      const sessionId = req.sessionId;
      // Save each answer
      await Promise.all(
        answers.map(async (answer) => {
          await Answer.create({
            quizId,
            QuestionId: answer.questionId,
            givenanswer: answer.selectedAnswer ?? answer.answerText,
            UserId: userId,
            sessionId: sessionId,
            nickname: req.body.nickname,
          });
        }),
      );

      res.status(201).json({ message: "Answers submitted successfully" });
    } catch (error) {
      console.log("Error:".concat(error));
      res.status(500).json({ message: error.message });
    }
  }

  static async getAnswers(req, res) {
    try {
      const answers = await Answer.findAll();
      res.json(answers);
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = AnswerController;
