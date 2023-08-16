const express = require('express')
const router = express.Router()
const { Op } = require("sequelize");
const { User } = require('../models/')

// FIND ALL
router.get('/find-all', async (req, res) => {
    User.findAll({ })
    .then((users) => {
        return res.status(200).json(users)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND ALL DASHBOARD
router.get('/find-all-dashboard', async (req, res) => {
  User.findAll({ where:{userRole:{[Op.ne]:'ROLE_ADMIN'}}})
  .then((users) => {
      return res.status(200).json(users)
  })
  .catch((error) => {
      return res.status(400).json(error)
  });
})

// FIND RECENTS
router.get('/find-recent-clients', async (req, res) => {
  User.findAll({
    limit: 10,
    order: [[ 'createdAt', 'DESC' ]],
    where: {userRole: 'ROLE_CLIENT'}
  })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    User.findById(req.params.id, {
       
        })
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
          }
    
          return res.status(200).json(user);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }

      user.update({
        ...user, //spread out existing user
        ...req.body //spread out req.body - the differences in the body will override the user returned from DB.
      })
      .then((updatedUser) => {
        return res.status(200).json(updatedUser)
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
    User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: 'User Not Found' });
      }
      user.destroy()
        .then((user) => {
          return res.status(200).json(user)
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