const emailValidator = require("email-validator");
const User = require("../models/users");
const Token = require("../models/token");
const sendEmail = require("../utils/helper");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../validate/hashNComparePwd");
const { findById } = require("../models/token");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    if (!req.query.nama) {
      return res.status(400).json({ message: "Wrong Query", status: 400 });
    }
    const result = await User.find(
      {
        nama: { $regex: req.query.nama, $options: "i" },
      },
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id },
      { _id: "$_id", nama: "$nama", email: "$email", role: "$role" }
    );
    console.log(user);
    res.status(200).json({
      user,
      message: "user ditemukan",
    });
  } catch (err) {
    res.status(404).json({
      message: "id not found",
    });
  }
};

const addUser = async (req, res) => {
  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: await hashPassword(req.body.password),
    role: 3,
  });
  try {
    const duplikat = await User.findOne({ email: user.email });
    if (duplikat) {
      throw new Error("email sudah digunakan");
    }
    if (emailValidator.validate(user.email) === false) {
      throw new Error("email not valid");
    }
    const addUser = await user.save();
    res.status(201).json({ addUser, message: "Registrasi Berhasil" });
  } catch (err) {
    res.status(400).json({ message: err.message, status: 400 });
  }
};

const deleteUser = async (req, res) => {
  try {
    const cekUser = await User.findOne({ _id: req.params.id });
    if (cekUser) {
      User.deleteOne(cekUser).then((result) => {
        res
          .status(200)
          .json({ result, message: "Data User Berhasil Di hapus" });
      });
    } else {
      res.status(400).json({ message: "id not found", status: 400 });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const ubahRoleUser = async (req, res) => {
  try {
    const cekUser = await User.findOne({ _id: req.params.id });
    // console.log(cekUser);
    if (!cekUser) {
      throw new Error("id not found");
    }
    if (req.body.role > 3 || req.body.role < 1) {
      throw new Error("User role not allowed");
    }
    const roleUpdated = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          role: req.body.role,
        },
      }
    );
    res.status(200).json(roleUpdated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const cekUser = await User.findOne({ email: req.body.email });
    if (!cekUser) {
      throw new Error("email atau password salah!");
    } else if (cekUser) {
      const matchPass = await comparePassword(
        req.body.password,
        cekUser.password
      );
      if (!matchPass) {
        throw new Error("email atau password salah!");
      }
      if (matchPass) {
        const dataUser = {
          nama: cekUser.nama,
          email: cekUser.email,
          role: cekUser.role,
        };

        const token = jwt.sign(dataUser, "secret", { expiresIn: "1d" });
        res.status(200).json({ dataUser, token, message: "login berhasil" });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reqPasswordReset = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "user with given does not exist" });
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    // console.log(token);
    // console.log(user);
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    sendEmail(user.email, "Reset Password", link);
    res.status(200).json({
      status: 200,
      message: "password reset link sent to your email account",
    });
  } catch (error) {
    res.send("An Error Occured");
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "invalid link or expired" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res
        .status(400)
        .json({ status: 400, message: "invalid link or expired" });
    user.password = await hashPassword(req.body.password);
    await user.save();
    await token.delete();
    /* Token.deleteOne({ userId: user._id }).then((result) => {
      console.log("token berhasil dihapus");
    }); */

    res.json({ message: "password reset succesfully" });
  } catch (error) {
    res.json({ message: "an error occured" });
    console.log(error);
  }
};

const reqError = (req, res) => {
  res
    .status(404)
    .json({ status: 404, message: "cannot request with this endpoint" });
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  reqError,
  login,
  ubahRoleUser,
  getUserById,
  searchUser,
  reqPasswordReset,
  resetPassword,
};
