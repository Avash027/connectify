const router = require("express").Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const isEmail = require("validator/lib/isEmail");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const baseUrl = require("../utils/server/baseUrl");

const options = {
  auth: {
    api_key: process.env.MAIL_KEY,
  },
};

const transporter = nodemailer.createTransport(sendgridTransport(options));

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) return res.status(401).send("Invalid email");

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(401).send("No user found");

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${baseUrl}/reset/${token}`;

    const mailOptions = {
      to: user.email,
      from: "avashmitra007@gmail.com",
      subject: "Password reset",
      html: `<p>Hey ${user.name
        .split(" ")[0]
        .toString()}, There was a request for password reset. <a href=${href}>Click this link to reset the password</a></p>
        <p>This token is valid is only for 1 hour</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => err && console.error(err));

    return res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/token", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) return res.status(401).send("Invalid token");
    if (!password || password.length < 6)
      return res.status(401).send("Invalid password");

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) return res.status(404).send("User not found");
    if (Date.now() > user.expireToken)
      return res.status(401).send("Token expired");

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();

    res.status(201).send("Password changed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
