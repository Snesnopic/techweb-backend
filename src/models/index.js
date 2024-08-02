const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Answer = require("./Answer");

User.hasMany(Quiz, {
  foreignKey: {
    allowNull: false,
  },
});
Quiz.belongsTo(User);

Quiz.hasMany(Question, {
  foreignKey: {
    allowNull: false,
  },
});
Question.belongsTo(Quiz);

Question.hasMany(Answer, {
  foreignKey: {
    allowNull: false,
  },
});
Answer.belongsTo(Question);

User.hasMany(Answer, {
  foreignKey: {
    allowNull: true,
  },
});
Answer.belongsTo(User);

module.exports = { User, Quiz, Question, Answer };
