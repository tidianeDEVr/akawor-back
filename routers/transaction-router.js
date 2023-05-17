const express = require('express')
const router = express.Router()
const { transaction } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    transaction.findAll({
        
    })
    .then((transactions) => {
        return res.status(200).json(transactions)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    transaction.findById(req.params.id, {
        
        })
        .then((transaction) => {
          if (!transaction) {
            return res.status(404).json({ message: 'Abonnement introuvable' });
          }

          return res.status(200).json(transaction);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    transaction.findById(req.params.id)
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: 'Abonnement introuvable' });
      }

      transaction.update({
        ...transaction,
        ...req.body
      })
      .then((updatedTransaction) => {
        return res.status(200).json(updatedTransaction)
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
    transaction.findById(req.params.id)
    .then((transaction) => {
      if (!transaction) {
        return res.status(400).json({ message: 'Abonnement introuvable' });
      }
      transaction.destroy()
        .then((transaction) => {
          return res.status(200).json(transaction)
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