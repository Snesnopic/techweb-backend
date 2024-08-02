const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Answer = require("../models/Answer");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
class UserController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username: username,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({ message: "User creation failed" });
      }
    } catch (error) {
      console.error("Error creating user:", error); // Log the error
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      res.json(user);
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }

  // Function to get all quizzes created by a user
  static async getUserQuizzes(req, res) {
    try {
      const userId = req.user.id;
      const quizzes = await Quiz.findAll({
        where: { userId },
        include: Question,
      });
      res.status(200).json(quizzes);
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }
  // Function to get all quizzes a user has given answers to
  static async getQuizzesWithUserAnswers(req, res) {
    try {
      const userId = req.user.id;
      // Fetch all answers related to the user, including the associated question and quiz
      const answers = await Answer.findAll({
        where: { userId },
        include: {
          model: Question,
          include: {
            model: Quiz,
          },
        },
      });
      res.status(200).json(answers);
    } catch (error) {
      console.log("Error=".concat(error));
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
