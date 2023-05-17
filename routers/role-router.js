const express = require('express')
const router = express.Router()
const { role } = require('../models/')


// FIND ALL
router.get('/find-all', async (req, res) => {
    role.findAll({
        
    })
    .then((roles) => {
        return res.status(200).json(roles)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    role.findById(req.params.id, {
        
        })
        .then((role) => {
          if (!role) {
            return res.status(404).json({ message: 'Role introuvable' });
          }

          return res.status(200).json(role);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(404).json({ message: 'Role introuvable' });
      }

      role.update({
        ...role,
        ...req.body
      })
      .then((updatedRole) => {
        return res.status(200).json(updatedRole)
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
    role.findById(req.params.id)
    .then((role) => {
      if (!role) {
        return res.status(400).json({ message: 'Role introuvable' });
      }
      role.destroy()
        .then((role) => {
          return res.status(200).json(role)
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