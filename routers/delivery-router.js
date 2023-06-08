const express = require('express')
const router = express.Router()
const { Delivery } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    Delivery.findAll({
        
    })
    .then((deliveries) => {
        return res.status(200).json(deliveries)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    Delivery.findById(req.params.id, {
        
        })
        .then((delivery) => {
          if (!delivery) {
            return res.status(404).json({ message: 'Livraison introuvable' });
          }

          return res.status(200).json(delivery);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    Delivery.findById(req.params.id)
    .then((delivery) => {
      if (!delivery) {
        return res.status(404).json({ message: 'Livraison introuvable' });
      }

      delivery.update({
        ...boost,
        ...req.body
      })
      .then((updatedDelivery) => {
        return res.status(200).json(updatedDelivery)
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
    Delivery.findById(req.params.id)
    .then((delivery) => {
      if (!delivery) {
        return res.status(400).json({ message: 'Livraison introuvable' });
      }
      delivery.destroy()
        .then((delivery) => {
          return res.status(200).json(delivery)
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