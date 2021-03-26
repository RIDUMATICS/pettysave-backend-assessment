/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Task.init(
    {
      user_id: DataTypes.UUID,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ['pending', 'in-progress', 'completed'],
      },
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );
  Task.beforeCreate(async (task) => {
    task.id = await uuidv4();
  });
  return Task;
};
