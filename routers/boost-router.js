const express = require("express");
const router = express.Router();
const { Boost } = require("../models/");
const passport = require("passport");

// FIND ALL
router.get(
  "/find-all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Boost
      .findAll({})
      .then((boosts) => {
        return res.status(200).json(boosts);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
);

// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Boost
    .findById(req.params.id, {})
    .then((boost) => {
      if (!boost) {
        return res.status(404).json({ message: "Boost introuvable" });
      }

      return res.status(200).json(boost);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// UPDATE
router.put("/update", async (req, res) => {
  Boost
    .findById(req.params.id)
    .then((boost) => {
      if (!boost) {
        return res.status(404).json({ message: "Boost introuvable" });
      }

      boost
        .update({
          ...boost,
          ...req.body,
        })
        .then((updatedBoost) => {
          return res.status(200).json(updatedBoost);
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
  Boost
    .findById(req.params.id)
    .then((boost) => {
      if (!boost) {
        return res.status(400).json({ message: "Boost introuvable" });
      }
      boost
        .destroy()
        .then((boost) => {
          return res.status(200).json(boost);
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
