/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // User instance method
    hashPassword() {
      const salt = bcrypt.genSaltSync(12);
      this.password = bcrypt.hashSync(this.password, salt);
    }

    // the user pass
    toJSON() {
      // get all user entities
      const values = { ...this.get() };

      // remove users password
      delete values.password;
      return values;
    }

    static associate(models) {
      // define association here
      User.hasMany(models.Task, {
        foreignKey: 'user_id',
        as: 'tasks',
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate(async (user) => {
    user.id = await uuidv4();
    user.email = user.email.toLowerCase();
    user.hashPassword();
  });
  return User;
};
