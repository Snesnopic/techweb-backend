const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Question = require('./Question');
const User = require('./User');

class Answer extends Model {}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    givenanswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Anonymous',
    },
  },
  {
    sequelize,
    tableName: 'answers',
  }
);

module.exports = Answer;
