const express = require('express')
const router = express.Router()
const { category } = require('../models/')
const categoriesProductsFixtures = [
  {
    categoryLibelle: 'Agroalimentaire',
    categoryIcon: 'fa-solid fa-plate-wheat'
  },
  {
    categoryLibelle: 'Animaux',
    categoryIcon: 'fa-solid fa-paw'
  },
  {
    categoryLibelle: 'Cosmétique, Santé et Bien-être',
    categoryIcon: 'fa-solid fa-heart'
  },
  {
    categoryLibelle: 'Articles de maison',
    categoryIcon: 'fa-solid fa-house-user'
  },
  {
    categoryLibelle: 'Matériaux, outils & équipements',
    categoryIcon: 'fa-solid fa-screwdriver-wrench'
  },
  {
    categoryLibelle: 'Mode & beauté',
    categoryIcon: 'fa-solid fa-heart'
  },
  {
    categoryLibelle: 'Multimédia',
    categoryIcon: 'fa-solid fa-laptop'
  },
  {
    categoryLibelle: 'Produis alimentaires',
    categoryIcon: 'fa-solid fa-drumstick-bite'
  },
  {
    categoryLibelle: 'Sports & loisirs',
    categoryIcon: 'fa-solid fa-person-running'
  },
  {
    categoryLibelle: 'Equipement de véhicules',
    categoryIcon: 'fa-solid fa-car'
  },
]
const categoriesShopsFixtures = [
  {
    libelle: 'Multimédia',
    icon: 'fa-solid fa-desktop'
  },
  {
    libelle: 'Mobilier & éléctroménager',
    icon: 'fa-solid fa-couch'
  },
  {
    libelle: 'Mode & beauté',
    icon: 'fa-solid fa-shirt'
  },
  {
    libelle: 'Sociétés de services',
    icon: 'fa-solid fa-person-digging'
  },
  {
    libelle: 'Produits alimentaires',
    icon: 'fa-solid fa-cookie-bite'
  },
  {
    libelle: 'Concessionnaires',
    icon: 'fa-solid fa-car'
  },
  {
    libelle: 'Matériaux & bricolage',
    icon: 'fa-solid fa-toolbox'
  },
  {
    libelle: 'Agences immobilières',
    icon: 'fa-solid fa-building'
  },
  {
    libelle: 'Accessoires auto moto',
    icon: 'fa-solid fa-car-battery'
  },
  {
    libelle: 'Agricoles et alimentaires',
    icon: 'fa-solid fa-wheat-awn'
  },
  {
    libelle: 'Sports, loisirs & voyages',
    icon: 'fa-solid fa-person-swimming'
  },
]


// INSERT
router.get('/fixtures-produits', async(req, res) => {
  categoriesProductsFixtures.forEach((cat)=>{
    let categ = new category()
    categ.categoryLibelle = cat.categoryLibelle
    categ.categoryIconClass = cat.categoryIcon
    categ.save().catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  })
  res.send('ok')
})
router.get('/fixtures-boutiques', async(req, res) => {
  categoriesShopsFixtures.forEach((cat)=>{
    let categ = new category()
    categ.categoryLibelle = cat.libelle
    categ.categoryIconClass = cat.icon
    categ.categoryType = 'shop'
    categ.save().catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  })
  res.send('ok')
})
// FIND ALL
router.get('/find-all', async (req, res) => {
    category.findAll({
        
    })
    .then(async (categories) => {
      return res.status(200).json(data)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})
router.get('/find-all/:type', async (req, res) => {
    let categoriesWithoutType = []
    const type = req.params.type
    category.findAll({
      where: {
        categoryType: type
      }
    })
    .then((categories) => {
      categories.forEach((c)=>{
        const {categoryType, ...data} = c.toJSON()
        categoriesWithoutType.push(data);
      })
      return res.json(categoriesWithoutType);
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