const express = require('express')
const router = express.Router()
const { category } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    category.findAll({
        
    })
    .then((categories) => {
        return res.status(200).json(categories)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    category.findById(req.params.id, {
        
        })
        .then((category) => {
          if (!category) {
            return res.status(404).json({ message: 'Categorie introuvable' });
          }
    
          return res.status(200).json(category);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: 'Categorie introuvable' });
      }

      category.update({
        ...category,
        ...req.body
      })
      .then((updatedCategory) => {
        return res.status(200).json(updatedCategory)
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
    category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(400).json({ message: 'Categorie introuvable' });
      }
      category.destroy()
        .then((category) => {
          return res.status(200).json(category)
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