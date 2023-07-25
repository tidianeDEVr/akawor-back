const express = require("express");
const router = express.Router();
const { Banner } = require("../models/");

// INSERT
router.post("/insert", async (req, res) => {
  const {
    bannerType,
    bannerFilename,
    bannerStartAt,
    bannerFinishAt,
    bannerRedirectTo,
    bannerTitle,
    bannerSubTitle
  } = req.body.banner;
  if(!bannerType || !bannerFilename) return res.status(400).send({message: 'Missing data !'})
  var bannerToAdd = new Banner();
  if(bannerType) bannerToAdd.bannerType = bannerType;
  if(bannerTitle) bannerToAdd.bannerTitle = bannerTitle;
  if(bannerSubTitle) bannerToAdd.bannerSubTitle = bannerSubTitle;
  if(bannerFilename) bannerToAdd.bannerFilename = bannerFilename;
  if(bannerStartAt) bannerToAdd.bannerStartAt = bannerStartAt;
  if(bannerFinishAt) bannerToAdd.bannerFinishAt = bannerFinishAt;
  if(bannerRedirectTo) bannerToAdd.bannerRedirectTo = bannerRedirectTo;
  await bannerToAdd.save();
  res.send(bannerToAdd);
});

// FIND HEADERS
router.get("/heroes", async (req, res) => {
  Banner.findAll({where: {bannerType: 'hero-banner'}})
    .then((banners) => {
      return res.status(200).json(banners);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND HEADERS
router.get("/headers", async (req, res) => {
  Banner.findAll({where: {bannerType: 'top-site-banner'}})
    .then((banners) => {
      return res.status(200).json(banners);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND ALL
router.get("/find-all", async (req, res) => {
  Banner.findAll({})
    .then((banners) => {
      return res.status(200).json(banners);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Banner.findById(req.params.id, {})
    .then((banner) => {
      if (!banner) {
        return res.status(404).json({ message: "Banner introuvable" });
      }

      return res.status(200).json(banner);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// UPDATE
router.put("/update", async (req, res) => {
  Banner.findById(req.params.id)
    .then((banner) => {
      if (!banner) {
        return res.status(404).json({ message: "Banner introuvable" });
      }

      banner
        .update({
          ...boost,
          ...req.body,
        })
        .then((updatedBanner) => {
          return res.status(200).json(updatedBanner);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// DESTROY
router.delete("/delete", async (req, res) => {
  Banner.findById(req.params.id)
    .then((banner) => {
      if (!banner) {
        return res.status(400).json({ message: "Banner introuvable" });
      }
      banner
        .destroy()
        .then((banner) => {
          return res.status(200).json(banner);
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
