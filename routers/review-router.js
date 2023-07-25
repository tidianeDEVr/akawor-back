const express = require("express");
const router = express.Router();
const { Review, User, Product } = require("../models/");
const passport = require("passport");


// INSERT REVIEW
router.post('/insert', async (req, res) => {
  const reviewAmount = req.body.review.reviewAmount;
  const reviewDescription = req.body.review.reviewDescription;
  const product = req.body.review.Product;
  const user = req.body.review.User;
  if(!reviewAmount || !reviewDescription || !product || !user)
    return res.send({message: 'missing data !'});
  const reviewToAdd = new Review()
  reviewToAdd.reviewAmount = reviewAmount;
  reviewToAdd.reviewDescription = reviewDescription;
  reviewToAdd.UserId = user.id;
  reviewToAdd.ProductId = product.id;
  await reviewToAdd.save();
  res.send(reviewToAdd);
})

// FIND ALL
router.get(
  "/find-all",
  // passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    Review
      .findAll({include: [{model: Product}, {model: User}]})
      .then((reviews) => {
        return res.status(200).json(reviews);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
);

// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Review
    .findById(req.params.id, {})
    .then((review) => {
      if (!review) {
        return res.status(404).json({ message: "Review introuvable" });
      }

      return res.status(200).json(review);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND BY PRODUCT 
router.get("/find-by-product/:id", async (req, res) => {
  const id = req.params.id;
  Review.findAll({where:{ProductId:id}, include: [{model: User}]})
  .then((reviews)=>{
    return res.send(reviews)
  })
  .catch((err)=>{
    return res.status(400).json(err);
  })
})

// UPDATE
router.put("/update", async (req, res) => {
  Review
    .findById(req.params.id)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ message: "Review introuvable" });
      }

      review
        .update({
          ...review,
          ...req.body,
        })
        .then((updatedReview) => {
          return res.status(200).json(updatedReview);
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
  Review
    .findById(req.params.id)
    .then((review) => {
      if (!review) {
        return res.status(400).json({ message: "Review introuvable" });
      }
      review
        .destroy()
        .then((review) => {
          return res.status(200).json(review);
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
