const express = require('express')
const router = express.Router()
const { pack } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    pack.findAll({
        
    })
    .then((packs) => {
        return res.status(200).json(packs)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    pack.findById(req.params.id, {
        
        })
        .then((pack) => {
          if (!pack) {
            return res.status(404).json({ message: 'Pack introuvable' });
          }

          return res.status(200).json(pack);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    pack.findById(req.params.id)
    .then((pack) => {
      if (!pack) {
        return res.status(404).json({ message: 'Pack introuvable' });
      }

      pack.update({
        ...pack,
        ...req.body
      })
      .then((updatedPack) => {
        return res.status(200).json(updatedPack)
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
    pack.findById(req.params.id)
    .then((pack) => {
      if (!pack) {
        return res.status(400).json({ message: 'Pack introuvable' });
      }
      pack.destroy()
        .then((pack) => {
          return res.status(200).json(pack)
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