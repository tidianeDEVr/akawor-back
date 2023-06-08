const express = require('express')
const router = express.Router()
const { Order } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    Order.findAll({
        
    })
    .then((orders) => {
        return res.status(200).json(orders)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    Order.findById(req.params.id, {
        
        })
        .then((order) => {
          if (!order) {
            return res.status(404).json({ message: 'Commande introuvable' });
          }

          return res.status(200).json(order);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: 'Commande introuvable' });
      }

      order.update({
        ...order,
        ...req.body
      })
      .then((updatedOrder) => {
        return res.status(200).json(updatedOrder)
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
    Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(400).json({ message: 'Commande introuvable' });
      }
      order.destroy()
        .then((order) => {
          return res.status(200).json(order)
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