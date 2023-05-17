const express = require('express')
const router = express.Router()
const { image } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    image.findAll({
        
    })
    .then((images) => {
        return res.status(200).json(images)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    image.findById(req.params.id, {
        
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
    image.findById(req.params.id)
    .then((image) => {
      if (!image) {
        return res.status(404).json({ message: 'Image introuvable' });
      }

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
    image.findById(req.params.id)
    .then((image) => {
      if (!image) {
        return res.status(400).json({ message: 'Image introuvable' });
      }
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