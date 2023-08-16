const express = require('express')
const router = express.Router()
const { Category } = require('../models/')
const { checkCategoryBeforeInsert } = require("../services/category-service");
const { generateSlug } = require('../services/util-service');
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
const subCategoriesProductsFixtures = [
  {
    categoryLibelle: 'Accessoires',
    categoryIconClass: '',
    parent: 4
  },
  {
    categoryLibelle: 'Robes',
    categoryIconClass: '',
    parent: 4
  },
  {
    categoryLibelle: 'Pantalons',
    categoryIconClass: '',
    parent: 4
  },
  {
    categoryLibelle: 'T-Shirts',
    categoryIconClass: '',
    parent: 4
  },
  {
    categoryLibelle: 'Ordinateurs de bureau',
    categoryIconClass: '',
    parent: 7
  },
  {
    categoryLibelle: 'Ordinateurs portables',
    categoryIconClass: '',
    parent: 7
  },
  {
    categoryLibelle: 'Composants',
    categoryIconClass: '',
    parent: 7
  },
  {
    categoryLibelle: 'Téléphones',
    categoryIconClass: '',
    parent: 7
  },
]


// INSERT
router.post('/insert', async(req, res)=> {
  const category = req.body.category;
  var parentCat;
  if(!category || !checkCategoryBeforeInsert(category)) 
    return res.status(400).send({message: 'Missing data'});
  const slugExist = await Category.findOne({where: {categorySlug: generateSlug(category.categoryLibelle)}});
  if(slugExist) return res.send({message: 'Already exist'});
  if(category.parentId) await Category.findOne({where: {id: category.parentId}})
  .then((res)=>{
    parentCat = res;
  })
  let toInsert = new Category();
  toInsert.categoryLibelle = category.categoryLibelle;
  toInsert.categorySlug = generateSlug(category.categoryLibelle)
  toInsert.categoryType = category.categoryType;
  if(category.categoryIconClass) toInsert.categoryIconClass = category.categoryIconClass;
  if(parentCat) toInsert.categoryParentId = parentCat.categoryParentId;
  await toInsert.save();
  res.send(toInsert);
})
router.get('/fixtures-sub-produits', async(req, res) => {
  subCategoriesProductsFixtures.forEach(async (cat)=>{
    let categ = new Category()
    categ.categoryParentId = cat.parent
    categ.categoryLibelle = cat.categoryLibelle
    categ.categorySlug =  generateSlug(cat.categoryLibelle);
    categ.categorySlug = categ.categorySlug.replaceAll(',', '');
    await categ.save().catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  })
  res.send('ok')
})
router.get('/fixtures-produits', async(req, res) => {
  categoriesProductsFixtures.forEach(async (cat)=>{
    let categ = new Category()
    categ.categoryLibelle = cat.categoryLibelle
    categ.categorySlug =  generateSlug(cat.categoryLibelle);
    categ.categoryIconClass = cat.categoryIcon
    await categ.save().catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  })
  res.send('ok')
})
router.get('/fixtures-boutiques', async(req, res) => {
  categoriesShopsFixtures.forEach(async(cat)=>{
    let categ = new Category()
    categ.categoryLibelle = cat.libelle
    categ.categorySlug = generateSlug(cat.libelle);
    categ.categoryIconClass = cat.icon
    categ.categoryType = 'shop'
    await categ.save().catch((err) => {
      console.log(err);
      return res.status(500).send(err);
    });
  })
  res.send('ok')
})
// FIND ALL
router.get('/find-all', async (req, res) => {
    Category.findAll({ })
    .then(async (categories) => {
      return res.status(200).json(categories)
    })
    .catch((error) => {
        return res.status(400).json(error)
    });
})
router.get('/find-all/:type', async (req, res) => {
    let categoriesWithoutType = []
    const type = req.params.type
    Category.findAll({
      where: {
        categoryType: type,
        categoryParentId: null
      },
      order: [
        [Category, 'categoryLibelle', 'ASC']
      ]
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
// FIND SUBCATEGORIES
router.get('/find-subs/:parent', async (req, res)=>{
  const parent = req.params.parent
  Category.findAll({where: { categoryParentId: parent },order: [
    [Category, 'categoryLibelle', 'ASC']
  ]})
  .then((categories)=>{
    res.send(categories)
  })
  .catch((err)=>{
    res.status(500).send({message: 'An error occur ! Try again later'})
  })
})

// FIND BY ID
router.get('/find-by-id/:id', async (req, res) => {
    Category.findOne({where: {id: req.params.id }})
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
    Category.findById(req.params.id)
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
    Category.findById(req.params.id)
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