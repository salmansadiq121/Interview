import { comparePassword, hashPassword } from "../helper/protectedPassword.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        messsage: "Email is required!",
      });
    }

    if (!password) {
      return res.status(400).send({
        success: false,
        messsage: "Password is required!",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found!" });
    }

    // Compare Pass
    const comparePass = await comparePassword(password, user.password);

    if (!comparePass) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password!",
      });
    }

    // Token
    const token = await jwt.sign(
      { id: user._id, user: user },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Login Successfully!",
      user: {
        id: user._id,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login controller",
      error,
    });
  }
};
