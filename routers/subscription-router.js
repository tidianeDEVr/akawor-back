const express = require('express')
const router = express.Router()
const { Subscription } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    Subscription.findAll({
        
    })
    .then((subscriptions) => {
        return res.status(200).json(subscriptions)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    Subscription.findById(req.params.id, {
        
        })
        .then((subscription) => {
          if (!subscription) {
            return res.status(404).json({ message: 'Abonnement introuvable' });
          }

          return res.status(200).json(subscription);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    Subscription.findById(req.params.id)
    .then((subscription) => {
      if (!subscription) {
        return res.status(404).json({ message: 'Abonnement introuvable' });
      }

      subscription.update({
        ...subscription,
        ...req.body
      })
      .then((updatedSubscription) => {
        return res.status(200).json(updatedSubscription)
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
    Subscription.findById(req.params.id)
    .then((subscription) => {
      if (!subscription) {
        return res.status(400).json({ message: 'Abonnement introuvable' });
      }
      subscription.destroy()
        .then((subscription) => {
          return res.status(200).json(subscription)
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