const express = require('express')
const router = express.Router()
const { Shop, User } = require('../models/')


// FIND ACTIVES 
router.get('/find-actives', async (req, res)=>{
  const shops = await Shop.findAll()
  if(shops) return res.send(shops)
  res.send({message: 'shops not found'})
})
// FIND BY SELLER
router.post('/find-by-seller', async (req, res)=>{
  const email = req.body.email;
  if(!email) return res.send({message: 'missing client email'});
  const seller = await User.findOne({where: {userEmail: email}})
  if(!seller) return res.send({message: 'seller not found'});
  const sp = await Shop.findOne({where: {userId: seller.id}})
  if(!seller) return res.send({message: 'shop not found'});
  res.send(sp)
})
// FIND BY SLUG
router.get('/find-by-slug/:slug', async (req, res)=>{
  const sp = await Shop.findOne({where: {shopSlug: req.params.slug}})
  if(sp) return res.send(sp)
  res.send({message: 'shop not found'})
})
// FIND ALL
router.get('/find-all', async (req, res) => {
    Shop.findAll({
        
    })
    .then((shops) => {
        return res.status(200).json(shops)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})

// FIND BY ID
router.get('/find-by-id', async (req, res) => {
    Shop.findOne(req.params.id, {
        
        })
        .then((shop) => {
          if (!shop) {
            return res.status(404).json({ message: 'Boutique introuvable' });
          }

          return res.status(200).json(shop);
        })
        .catch((error) => {
          return res.status(400).json(error)
    });
})

// UPDATE
router.put('/update', async (req, res) => {
    Shop.findById(req.params.id)
    .then((shop) => {
      if (!shop) {
        return res.status(404).json({ message: 'Boutique introuvable' });
      }

      shop.update({
        ...shop,
        ...req.body
      })
      .then((updatedShop) => {
        return res.status(200).json(updatedShop)
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
    Shop.findById(req.params.id)
    .then((shop) => {
      if (!shop) {
        return res.status(400).json({ message: 'Boutique introuvable' });
      }
      shop.destroy()
        .then((shop) => {
          return res.status(200).json(shop)
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