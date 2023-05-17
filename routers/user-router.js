const express = require('express')
const router = express.Router()
const { user } = require('../models/')

// INSCRIPTION
router.get('/register', async (req, res) => {
    user.create({
        userFirstName: "Cheikh Tidiane",
        userLastName: "Ndiaye",
        userEmail: "godex@gmail.com",
        userPassword: "mycomplexxpassword",
        userPhoneNumber: 782141278,
        userBirthday: new Date(), 
    }).catch((err) => {
        if(err) console.log(err);
    })
    res.send({status: 'Registered successfully',})
})

// CONNEXION
router.post('/login', async (req, res) => {
    res.send('loggin')
})

// FIND ALL
router.get('/find-all', async (req, res) => {
    user.findAll({
        // include: [{
        //   model: Task,
        //   as: 'tasks'
        // }]
    })
    .then((users) => {
        return res.status(200).json(users)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    user.findById(req.params.id, {
        //   include: [{
        //     model: Task,
        //     as: 'tasks'
        //   }]
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
    user.findById(req.params.id)
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
    user.findById(req.params.id)
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