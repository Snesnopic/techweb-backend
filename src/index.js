const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./utils/db');
const quizRoutes = require('./routes/quiz');
const userRoutes = require('./routes/user');
const answerRoutes = require('./routes/answer');
const sessionMiddleware = require('./middleware/session');
const cors = require('cors');
const { User, Quiz, Question, Answer } = require('./models');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(sessionMiddleware);

app.use(cors())

app.use('/api', quizRoutes);
app.use('/api', userRoutes);
app.use('/api', answerRoutes);

User.hasMany(Quiz, { foreignKey: {
  allowNull: false
}});
Quiz.belongsTo(User);

Quiz.hasMany(Question, { foreignKey: {
  allowNull: false
}});
Question.belongsTo(Quiz);

Question.hasMany(Answer, { foreignKey: {
  allowNull: false
} });
Answer.belongsTo(Question);

User.hasMany(Answer, { foreignKey: {
  allowNull: true
}} );
Answer.belongsTo(User);


sequelize.sync({sync: true}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
