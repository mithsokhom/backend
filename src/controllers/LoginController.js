const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(200).json({ message: "Required field missing!" });
      }

      const user = await User.findOne({ email });//user
      if (!user) {
        return res.status(200).json({
          message: "User not found! Do you want to register instead?",
        });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        };
        //return res.json(userResponse);
        return jwt.sign({user: userResponse}, 'secret', (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id //user is coming from the user/userResponse
          })
        })
      } else {
        return res
          .status(200)
          .json({ message: "Email or Password doesn't match" });
      }
    } catch (error) {
      throw Error(`Error while authenticating a User ${error}`);
    }
  },
};
