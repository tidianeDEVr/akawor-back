const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { user } = require("../models/");
const {
  checkUserAttrsOnRegister,
  checkUserAttrsOnLogin,
  decryptPassword,
  encryptPassword,
} = require("../services/security-service");

// INSCRIPTION
router.post("/register", async (req, res) => {
  if (!checkUserAttrsOnRegister(req.body))
    return res.status(500).send({ message: "Missing data" });
  const {
    userFirstName,
    userLastName,
    userBirthday,
    userEmail,
    userPassword,
    userPhoneNumber,
  } = req.body;
  let hashedPwObject = await encryptPassword(req.body.userPassword);
  let newUser = new user({
    userFirstName,
    userLastName,
    userBirthday,
    userEmail,
    userPassword,
    userPhoneNumber,
  });
  newUser.userPassword = hashedPwObject.hashedPw;
  newUser.userSalt = hashedPwObject.salt;
  console.log(newUser);
  const isAlreadyExists = await user
    .findOne({ where: { userEmail } })
    .catch((err) => {
      console.log(err);
    });
  if (isAlreadyExists) return res.send({ message: "Already exists!" });
  await newUser.save().catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
  res.send({ status: "success" });
});

// CONNEXION
router.post("/login", async (req, res) => {
  const errorMessage = "Email or password does not match !";
  if (!checkUserAttrsOnLogin(req.body))
    return res.status(500).send({ message: "Missing data" });
  const { userEmail, userPassword } = req.body;
  const userWithEmail = await user
    .findOne({ where: { userEmail } })
    .catch((err) => {
      console.log(err);
    });
  if (!userWithEmail) return res.status(401).send({ message: errorMessage });
  decryptPassword(userPassword, userWithEmail.userPassword).then((bool) => {
    if (bool) {
      const jwtToken = jwt.sign(
        { id: userWithEmail.id, userEmail: userWithEmail.userEmail },
        config.JWT_SECRET
      );
      res.cookie("jwt", jwtToken, {
        httpOnly: true,
        maxAge: 48 * 60 * 60 * 1000,
      }); // max age : 2 days
      res.json({ message: "success" });
    } else {
      return res.status(401).send({ message: errorMessage });
    }
  });
});

// GET AUTHENTICATED USER
router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, config.JWT_SECRET);
    if (!claims) res.status(401).send({ message: "unauthenticated" });
    const authenticatedUser = await user.findOne({ id: claims.id });
    const { userPassword, userSalt, ...data } =
      await authenticatedUser.toJSON();
    res.send(data);
  } catch (error) {
    res.status(401).send({ message: "unauthenticated" });
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "success" });
});

module.exports = router;
