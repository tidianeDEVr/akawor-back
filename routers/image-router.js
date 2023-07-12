const express = require("express");
const router = express.Router();
const { Image, Shop, Product } = require("../models/");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
let imageNames = [];
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/");
  },
  filename: (req, file, callback) => {
    const imageName =
      Date.now() + getRandomInt(1000) + path.extname(file.originalname);
    imageNames.push(imageName);
    callback(null, imageName);
  },
});
const upload = multer({ storage: storage });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// UPLOAD IMG
router.post("/upload", upload.array("images"), async (req, res) => {
  const productId = req.query.product;
  const shopId = req.query.shop;
  const isMainImage = req.query.mainImage;
  console.log(isMainImage);
  let productObject;
  if (productId && productId != 0) {
    await Product.findOne({ where: { id: productId } }).then(async (res) => {
      if (res) productObject = res;
      if(isMainImage=='true') {
        await res.setDataValue("productMainImage", req.files[0].filename);
        await res.save();
      }
    });
  }
  if (shopId && shopId != 0) {
    await Shop.findOne({ where: { id: shopId } }).then(async (res) => {
      if (res) await res.setDataValue("shopLogoImage", req.files[0].filename);
      await res.save();
    });
  }
  imageNames.forEach(async (element) => {
    if (element && element != "") {
      let img = new Image();
      await img.setDataValue("imageTitle", element);
      if (productObject) await img.setProduct(productObject);
      await img.save();
    }
  });
  imageNames = [];
  res.send({ message: "uploaded successfully" });
});
// FIND ALL
router.get("/find-by-product/:id", async (req, res) => {
  Image.findAll({ where: { productId: req.params.id } })
    .then((images) => {
      return res.send(images);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Image.findOne(req.params.id, {})
    .then((image) => {
      if (!image) {
        return res.status(404).json({ message: "Image introuvable" });
      }

      return res.status(200).json(image);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// UPDATE
router.put("/update", async (req, res) => {
  Image.findById(req.params.id)
    .then((image) => {
      if (!image) return res.status(404).json({ message: "Image introuvable" });
      image
        .update({
          ...image,
          ...req.body,
        })
        .then((updatedImage) => {
          return res.status(200).json(updatedImage);
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
router.delete("/delete/:type/:id", async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  console.log(req.headers);
  if (type === "shop" && id) {
    const shop = await Shop.findOne({ where: { id: id } });
    // shop.setDataValue('shopLogoImage', '');
    console.log(shop);
    // shop.save();
  }
  res.send("ok");
  // Image.findOne({where: {id}})
  // .then((image) => {
  //   if (!image) return res.status(400).json({ message: 'image not found' });
  //   try {
  //     fs.unlinkSync('./public/images/' + image.imageTitle);
  //   } catch (error) { }
  //   image.destroy()
  //     .then((image) => {
  //       return res.status(200).json(image)
  //     })
  //     .catch((error) => {
  //       return res.status(400).json(error)
  //     });
  // })
  // .catch((error) => {
  //   return res.status(400).json(error)
  // });
});

module.exports = router;
