const express = require('express')
const router = express.Router()
const { Image } = require('../models/')
const path =  require('path')
const fs = require('fs')
const multer = require('multer')
let imageNames = [];
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images/');
    },
    filename: (req, file, callback) => {
        const imageName = Date.now() + getRandomInt(1000) + path.extname(file.originalname)
        imageNames.push(imageName);
        callback(null, imageName);
    }
});
const upload = multer({storage: storage});

function getRandomInt(max) { return Math.floor(Math.random() * max) }

// UPLOAD IMG
router.post('/upload', upload.array('images'),async(req, res) => {
  const productId = req.headers['product'];
  const shopId = req.headers['shop'];
  imageNames.forEach((element)=>{
    const img = new Image();
    img.imageTitle = element;
    if(productId && productId!=0) img.productId = productId;
    if(shopId && shopId!=0) img.shopId = shopId;
    img.save();
  })
  res.send({message: 'uploaded!'});
  imageNames = [];
})
// FIND ALL
router.get('/find-by-product/:id', async (req, res) => {
  Image.findAll({where: {productId: req.params.id}})
  .then((images) => {
      return res.send(images)
  })
  .catch((error) => {
      return res.status(400).json(error)
  });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    Image.findOne(req.params.id, {
        
        })
        .then((image) => {
          if (!image) {
            return res.status(404).json({ message: 'Image introuvable' });
          }

          return res.status(200).json(image);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    Image.findById(req.params.id)
    .then((image) => {
      if (!image) return res.status(404).json({ message: 'Image introuvable' });
      image.update({
        ...image,
        ...req.body
      })
      .then((updatedImage) => {
        return res.status(200).json(updatedImage)
      })
      .catch((error) => {
        return res.status(400).json(error)
      });
    })
    .catch((error) => {
      return res.status(400).json(error)
    });
})

// DESTROY
router.delete('/delete', async (req, res) => {
    Image.findOne(req.params.id)
    .then((image) => {
      if (!image) return res.status(400).json({ message: 'image not found' });
      try {
        fs.unlinkSync('./public/images/' + image.imageTitle);
      } catch (error) { }
      image.destroy()
        .then((image) => {
          return res.status(200).json(image)
        })
        .catch((error) => {
          return res.status(400).json(error)
        });
    })
    .catch((error) => {
      return res.status(400).json(error)
    });
})

module.exports = router