const express = require('express')
const router = express.Router()
const { orderLine } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    orderLine.findAll({
        
    })
    .then((orderlines) => {
        return res.status(200).json(orderlines)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    orderLine.findById(req.params.id, {
        
        })
        .then((orderline) => {
          if (!orderline) {
            return res.status(404).json({ message: 'Ligne de commande introuvable' });
          }

          return res.status(200).json(orderline);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    orderLine.findById(req.params.id)
    .then((orderline) => {
      if (!orderline) {
        return res.status(404).json({ message: 'Ligne de commande introuvable' });
      }

      orderline.update({
        ...orderline,
        ...req.body
      })
      .then((updatedOrderline) => {
        return res.status(200).json(updatedOrderline)
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
    orderLine.findById(req.params.id)
    .then((orderline) => {
      if (!orderline) {
        return res.status(400).json({ message: 'Ligne de commande introuvable' });
      }
      orderline.destroy()
        .then((orderline) => {
          return res.status(200).json(orderline)
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