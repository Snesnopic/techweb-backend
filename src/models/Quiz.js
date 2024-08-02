const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class Quiz extends Model {}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    maxErrors: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'quizzes',
  }
);

module.exports = Quiz;
