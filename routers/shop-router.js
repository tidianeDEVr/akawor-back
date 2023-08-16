const express = require("express");
const router = express.Router();
const { Shop, User, Social, Category } = require("../models/");
const { generateSlug } = require('../services/util-service');

// FIND ACTIVES
router.get("/find-actives", async (req, res) => {
  const shops = await Shop.findAll({where:{shopState: 'ONLINE'}});
  if (shops) return res.send(shops);
  res.send({ message: "shops not found" });
});
// FIND BY SELLER
router.post("/find-by-seller", async (req, res) => {
  const email = req.body.email;
  if (!email) return res.send({ message: "missing client email" });
  const seller = await User.findOne({ where: { userEmail: email } });
  if (!seller) return res.send({ message: "seller not found" });
  const sp = await Shop.findOne({
    where: { userId: seller.id },
    include: [
      {
        model: Social,
      },
      {
        model: Category,
      },
    ],
  });
  if (!seller) return res.send({ message: "shop not found" });
  res.send(sp);
});
// FIND BY SLUG
router.get("/find-by-slug/:slug", async (req, res) => {
  const sp = await Shop.findOne({
    where: { shopSlug: req.params.slug },
    include: [
      {
        model: Social,
      },
    ],
  });
  if (sp) return res.send(sp);
  res.send({ message: "shop not found" });
});
// FIND ALL
router.get("/find-all", async (req, res) => {
  Shop.findAll({
    include: [
      {
        model: Category,
      },
      {
        model: User,
      },
    ],
  })
    .then((shops) => {
      return res.status(200).json(shops);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND BY ID
router.get("/find-by-id/:id", async (req, res) => {
  Shop.findByPk(req.params.id)
    .then((shop) => {
      if (!shop) return res.status(404).json({ message: "Boutique introuvable" });
      return res.status(200).json(shop);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// UPDATE
router.put("/update", async (req, res) => {
  const shop = req.body.shop;
  const social = req.body.social;
  const category = await Category.findOne({
    where: { categoryLibelle: req.body.categoryLibelle },
  });
  if (shop) {
    Shop.findOne({ where: { id: shop.id } })
      .then((res) => {
        if (res) {
          res.shopLibelle = shop.shopLibelle;
          res.shopSlug = generateSlug(shop.shopLibelle);
          res.shopAddress = shop.shopAddress;
          res.shopDescription = shop.shopDescription;
          res.shopLatitude = shop.shopLatitude;
          res.shopLongitude = shop.shopLongitude;
          res.shopWorkingHours = shop.shopWorkingHours;
          if (category) res.setCategory(category);
          res.save();
        }
      })
      .catch((err) => {
        console.log(err);
        return res.send(false);
      });
  }
  if (social) {
    Social.findOne({ where: { id: social.id } })
      .then((soc) => {
        if (soc) {
          soc.facebookLink = social.facebookLink;
          soc.instagramLink = social.instagramLink;
          soc.tiktokLink = social.tiktokLink;
          soc.websiteLink = social.websiteLink;
          soc.shopPhoneNumber = social.shopPhoneNumber;
          soc.shopEmailAddress = social.shopEmailAddress;
          soc.save();
        }
      })
      .catch((err) => {
        console.log(err);
        return res.send(false);
      });
  }
  return res.send(true);
});

// DESTROY
router.delete("/delete", async (req, res) => {
  Shop.findById(req.params.id)
    .then((shop) => {
      if (!shop) {
        return res.status(400).json({ message: "Boutique introuvable" });
      }
      shop
        .destroy()
        .then((shop) => {
          return res.status(200).json(shop);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = router;
