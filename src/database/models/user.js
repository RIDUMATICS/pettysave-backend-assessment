/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // User instance method

    /**
     * @description hash user password
     * @return void
     * @param none
     */
    hashPassword() {
      const salt = bcrypt.genSaltSync(12);
      this.password = bcrypt.hashSync(this.password, salt);
    }

    /**
     * @description validate if input password is the same with hashed password
     * @return boolean
     * @param user input password
     */
    validatePassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

    /**
     * @description Generate token for user
     * @return string
     * @param none
     */
    generateToken() {
      const payload = { id: this.id };
      return jwt.sign(payload, process.env.secretOrPrivateKey, {
        expiresIn: '24h',
      });
    }

    /**
     * @description override toJSON Method of Model to remove password
     * @return object
     * @param none
     */
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
