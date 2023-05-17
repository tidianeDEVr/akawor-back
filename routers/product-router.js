const express = require('express')
const router = express.Router()
const { product } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    product.findAll({
        
    })
    .then((products) => {
        return res.status(200).json(products)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    product.findById(req.params.id, {
        
        })
        .then((product) => {
          if (!product) {
            return res.status(404).json({ message: 'Produit introuvable' });
          }

          return res.status(200).json(product);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Produit introuvable' });
      }

      product.update({
        ...product,
        ...req.body
      })
      .then((updatedProduct) => {
        return res.status(200).json(updatedProduct)
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
    product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(400).json({ message: 'Produit introuvable' });
      }
      product.destroy()
        .then((product) => {
          return res.status(200).json(product)
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