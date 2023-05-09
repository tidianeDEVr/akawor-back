const { user, Task } = require('../models/')

function findAll(req,res) {
  user.findAll({
    // include: [{
    //   model: Task,
    //   as: 'tasks'
    // }]
  })
  .then((user) => {
    return res.status(200).json(user)
  })
  .catch((error) => {
    return res.status(400).json(error)
  });
}

function create(req,res) {
  user.create({
    userFirstName: req.body.firstName,
    userLastName: req.body.lastName,
    userEmail: req.body.email
  })
  .then((user) => {
    return res.status(200).json(user)
  })
  .catch((error) => {
    return res.status(400).json(error)
  });
}

function findBy(req,res) {
  user.findById(req.params.id, {
    //   include: [{
    //     model: Task,
    //     as: 'tasks'
    //   }]
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User Not Found' });
      }

      return res.status(200).json(user);
    })
    .catch((error) => {
      return res.status(400).json(error)
    });
}

function update(req,res) {
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
}

function destroy(req,res) {
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
}

module.exports = { findAll, create, findBy, update, destroy }