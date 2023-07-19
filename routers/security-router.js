const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { User, Shop, Social, Wishlist } = require("../models/");
const {
  checkUserAttrsOnRegister,
  checkUserAttrsOnLogin,
  decryptPassword,
  encryptPassword,
} = require("../services/security-service");
const { TOKEN_LABEL } = require("../env");

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
    userRole,
  } = req.body;
  let hashedPwObject = await encryptPassword(req.body.userPassword);
  let newUser = new User({
    userFirstName,
    userLastName,
    userBirthday,
    userEmail,
    userPassword,
    userPhoneNumber,
    userRole,
  });
  const isAlreadyExists = await User
    .findOne({ where: { userEmail } })
    .catch((err) => {
      console.log(err);
    });
  if (isAlreadyExists) return res.send({ message: "already exists!" });
  newUser.userPassword = hashedPwObject.hashedPw;
  newUser.userSalt = hashedPwObject.salt;

  await newUser.save().catch((err) => {
    console.log(err);
    return res.status(500).send(err);
  });
  if (userRole === 'ROLE_VENDEUR') {
    let newShop =  new Shop();
    await newShop.setUser(newUser);
    let social = new Social();
    await social.setShop(newShop);
  }
  let wishlist = new Wishlist();
  await wishlist.setUser(newUser);
  res.send({ status: "success" });
});

// CONNEXION
router.post("/login", async (req, res) => {
  const errorMessage = "Email or password does not match !";
  if (!checkUserAttrsOnLogin(req.body))
    return res.status(500).send({ message: "Missing data" });
  const { userEmail, userPassword } = req.body;
  const userWithEmail = await User
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
      res.cookie(TOKEN_LABEL, jwtToken, {
        httpOnly: true,
        maxAge: 48 * 60 * 60 * 1000,
      }); // max age : 2 days
      res.json({ message: "success", role: userWithEmail.userRole });
    } else {
      return res.status(401).send({ message: errorMessage });
    }
  });
});

// GET AUTHENTICATED USER
router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies[TOKEN_LABEL];
    const claims = jwt.verify(cookie, config.JWT_SECRET);
    if (!claims) res.send({ message: "unauthenticated" });
    // return res.send(claims);
    const authenticatedUser = await User.findOne({ where: {id: claims.id} });
    const { userPassword, userSalt, ...data } =
      await authenticatedUser.toJSON();
    res.send(data);
  } catch (error) {
    res.send({ message: "unauthenticated" });
  }
});

// LOGOUT
router.post("/logout", async (req, res) => {
  res.cookie(TOKEN_LABEL, "", { maxAge: -999 });
  res.send({ message: "success" });
});

module.exports = router;
