const createError = require("../utils/createError");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const genToken = (payload) =>
   jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });

exports.login = async (req, res, next) => {
   try {
      const { username, password } = req.body;

      if (!username) {
         createError("username is required", 400);
      }
      if (!password) {
         createError("password is required", 400);
      }
      if (password.length < 6) {
         createError("password must be at least 6 characters", 400);
      }

      const user = await User.findOne({
         where: { username },
      });

      if (!user) {
         createError("invalid credential", 400);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         createError("invalid credential password", 400);
      }
      console.log(JSON.stringify(user, null, 2));

      const token = genToken({ id: user.id });
      res.json({ token });
   } catch (err) {
      next(err);
   }
};

exports.signUp = async (req, res, next) => {
   try {
      const { username, email, password, confirmPassword } = req.body;
      if (!username) {
         createError("username is required", 400);
      }
      if (!password) {
         createError("password is required", 400);
      }
      if (password !== confirmPassword) {
         createError("password and confirm password didn't match", 400);
      }

      const isEmail = validator.isEmail(email + "");
      if (!isEmail) {
         createError("email is invalid format", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
         username,
         email,
         password: hashedPassword,
      });
      console.log(JSON.stringify(user, null, 2));
      const token = genToken({ id: user.id });
      res.status(201).json({ token });
   } catch (err) {
      next(err);
   }
};
