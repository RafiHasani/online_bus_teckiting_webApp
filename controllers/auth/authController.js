"use strict";
require("dotenv").config();
const { User } = require("../../schemas/bus_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      res.json({
        message: "Invalide request, check values",
      });
    } else {
      console.log(body);

      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(body.password, salt);

      const jwt_secret_key = process.env.secret_key;

      const payload = {
        username: body.username,
        email: body.email,
        password: hashpassword,
      };

      const jwtkey = await jwt.sign(payload, jwt_secret_key);
      payload.jwt_key = jwtkey;

      const newUser = new User({ ...payload });

      newUser
        .save()
        .then((data) => {
          res.json({
            statusCode: 200,
            message: "User created successfully.",
            error: null,
            state: "OK",
          });
          console.log(data);
        })
        .catch((err) => {
          err.code == 11000
            ? res.json({
                statusCode: 400,
                message: "email address already exist!",
                error: "Duplicate email error",
                state: "OK",
              })
            : res.json({
                statusCode: 400,
                message: "Somthing when wrong",
                error: err,
                state: "OK",
              });
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  let result;
  const { email, password } = req.body;
  if (!email && !password) {
    res.json({
      statusCode: 400,
      message: "Invalid username or password!",
      error: "Invalid username or password!",
      state: "OK",
    });
  } else {
    result = await User.findOne({
      email: email,
    }).exec();

    const isValidPassword = await bcrypt.compare(password, result.password);

    if (isValidPassword) {
      console.log(isValidPassword);
      res.json({
        statusCode: 200,
        message: "Login successfully!",
        error: null,
        state: "OK",
        data: result,
      });
    } else {
      res.json({
        statusCode: 400,
        message: "Invalid username or password!",
        error: "Error",
        state: "OK",
      });
    }
  }
};

const deleteUser = async (req, res) => {
  const { email, password } = req.body;

  const result = User.find({
    email: email,
  }).exec();

  if (result && result.length != 0) {
    console.log(result);
    const deleteq = User.deleteOne({ email: email });
    const deleteResult = deleteq.exec();
    if (deleteResult) {
      res.json({
        statusCode: 200,
        message: "User successfully deleted!",
        error: null,
        state: "OK",
        data: result,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "Something when wrong!",
        error: "Error",
        state: "OK",
      });
    }
  } else {
    res.json({
      statusCode: 400,
      message: "Invalid email address!",
      error: "Error",
      state: "OK",
    });
  }
};

module.exports = { signup, login, deleteUser };
