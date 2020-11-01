const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {
  async createUser(req, res) {
    try {
      const { firstname, lastname, password, email } = req.body;

      const existentUser = await User.findOne({ email });
      if (!existentUser) {
        const hastPassword = await bcrypt.hash(password, 10);
        const userResponse = await User.create({
          firstname,
          lastname,
          email,
          password: hastPassword,
        });
        // return res.json({
        //   _id: user._id,
        //   email: user.email,
        //   firstname: user.firstname,
        //   lastname: user.lastname
        // });
        return jwt.sign({user: userResponse}, 'secret', (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id //user is coming from the user/userResponse
          })
        })
      }
      return res.status(400).json({
        message: "email/user already exist. do you want to login instead?",
      });
    } catch (err) {
      throw Error(`Error while registering a new user ${err}`);
    }
  },
  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "User ID does not exist. do you want to register instead?",
      });
    }
  },
};