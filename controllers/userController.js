const { User } = require("../models");
const bcrypt = require("bcryptjs");
const createError = require("../utils/createError");

// get All users
exports.getAllUser = async (req, res, next) => {
   try {
      const users = await User.findAll({
         attributes: { exclude: ["password"] },
      });
      if (!users) {
         createError("user not found", 404);
      }
      res.json({ users });
   } catch (err) {
      next(err);
   }
};

// get me by id
exports.getMe = async (req, res, next) => {
   try {
      const { id } = req.user;
      console.log(req.user);
      const user = await User.findOne({
         where: id,
      });
      if (!user) {
         createError("user not found", 404);
      }
      res.json({ user });
   } catch (err) {
      next(err);
   }
};

// Edit user
exports.updateUser = async (req, res, next) => {
   try {
      console.log(req.body);
      const { id } = req.user;
      const { firstName, lastName, phoneNumber, address } = req.body;
      const user = await User.findOne({
         where: id,
      });
      if (!user) {
         createError("user not found", 404);
      }
      console.log(user.id);
      console.log(req.user.id);
      if (user.id !== req.user.id) {
         createError("you have no permission", 403);
      }

      if (firstName && lastName && phoneNumber) {
         user.firstName = firstName;
         user.lastName = lastName;
         user.phoneNumber = phoneNumber;
      }
      if (address) {
         user.address = address;
      }

      await user.save();
      res.status(201).json({ user });
   } catch (err) {
      next(err);
   }
};

// Add Information
exports.postMoreInfoUser = async (req, res, next) => {
   const { userId } = req.params;
   const { firstName, lastName, phoneNumber, address } = req.body;
   const user = await User.findOne({
      where: { id: userId },
   });
   console.log(user);
   if (!user) {
      createError("user not found", 404);
   }
   if (!firstName) {
      createError("firstName is required", 400);
   }
   if (!lastName) {
      createError("lastName is required", 400);
   }
   if (!address) {
      createError("address is required", 400);
   }

   const result = await User.update(
      {
         firstName,
         lastName,
         phoneNumber,
         address,
      },
      { where: { id: userId } }
   );

   console.log(result);
   res.json({ result });
};

exports.updatePassword = async (req, res, next) => {
   try {
      const user = req.user;
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      const userPassword = await User.findOne({
         where: { id: user.id },
      });
      console.log(userPassword);
      if (!userPassword) {
         createError("userPassword not found", 400);
      }

      // console.log(user.password);
      const isMatched = await bcrypt.compare(oldPassword, user.password);
      if (!isMatched) {
         createError("oldPassword not match", 400);
      }

      if (newPassword !== confirmNewPassword) {
         createError("new password not match", 400);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      const userUpdate = await User.update(
         {
            password: hashedPassword,
         },
         { where: { id: user.id } }
      );

      res.status(200).json({ userUpdate });
   } catch (err) {
      next(err);
   }
};
