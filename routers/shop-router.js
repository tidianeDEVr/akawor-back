const express = require('express')
const router = express.Router()
const { shop } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    shop.findAll({
        
    })
    .then((shops) => {
        return res.status(200).json(shops)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    shop.findById(req.params.id, {
        
        })
        .then((shop) => {
          if (!shop) {
            return res.status(404).json({ message: 'Boutique introuvable' });
          }

          return res.status(200).json(shop);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    shop.findById(req.params.id)
    .then((shop) => {
      if (!shop) {
        return res.status(404).json({ message: 'Boutique introuvable' });
      }

      shop.update({
        ...shop,
        ...req.body
      })
      .then((updatedShop) => {
        return res.status(200).json(updatedShop)
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
    shop.findById(req.params.id)
    .then((shop) => {
      if (!shop) {
        return res.status(400).json({ message: 'Boutique introuvable' });
      }
      shop.destroy()
        .then((shop) => {
          return res.status(200).json(shop)
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