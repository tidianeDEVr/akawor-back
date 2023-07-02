const express = require("express");
const router = express.Router();
const { Wishlist, Product, Shop, Category } = require("../models/");
const { checkProductBeforeInsert } = require("../services/product-service");
const _ = require("lodash");

// CREATE PRODUCT
router.post("/insert", async (req, res) => {
  if (!checkProductBeforeInsert)
    return res.status(400).send({ message: "missing data!" });
  const {
    productTitle,
    productPrice,
    productDescription,
    productCategory,
    productFeatures,
  } = req.body.product;
  const productOwnerId = req.body.productOwnerId;
  let isProductExist = await Product.findOne({ where: { productTitle } });
  if (isProductExist) return res.status(401).send({ message: "already exit" });

  let productObject = await Product.create({
    productTitle,
    productPrice,
    productDescription,
    productCategory,
    productFeatures,
  });
  const ownerShop = await Shop.findOne({ where: { userId: productOwnerId } });
  const categ = await Category.findOne({ where: { id: productCategory.id } });
  if (ownerShop && categ) {
    productObject.setShop(ownerShop.id);
    productObject.setCategory(categ.id);
  }
  productObject.productSlug = productTitle
    .replaceAll(" ", "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  await productObject.save();
  res.send(productObject);
});
// FIND BY SELLER
router.get("/seller/:id", async (req, res) => {
  const id = req.params.id;
  let shopObject = await Shop.findOne({ where: { userId: id } });
  if (!shopObject.id)
    return res.status(400).send({ message: "shop not found" });
  let products = await shopObject.getProducts();
  res.send(products);
});
// FIND BY SHOP
router.get("/find-by-shop/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.send({ message: "missing data" });
  let products = await Product.findAll({ where: { shopId: id } });
  if (products) return res.send(products);
  res.send({ message: "products not found" });
});
// FIND BY CATEGORY
router.get("/find-by-category/:slug", async (req, res) => {
  const slug = req.params.slug;
  if (!slug) return res.send({ message: "missing data" });
  const category = await Category.findOne({ where: { categorySlug: slug } });
  if (!category) return res.send({ message: "category not found" });
  let products = await category.getProducts();
  const childCategories = await Category.findAll({
    where: { categoryParentId: category.id },
    include: [
      {
        model: Product,
      },
    ],
  });
  if (childCategories.length > 0) {
    childCategories.forEach((elt) => {
      products = _.union(products, elt.Products);
    });
  }
  return res.send(products);
});
// FIND ALL
router.get("/find-all", async (req, res) => {
  Product.findAll({})
    .then((products) => {
      return res.status(200).json(products);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
// FIND BY SLUG
router.get("/find-by-slug/:slug", async (req, res) => {
  const prod = await Product.findOne({
    where: { productSlug: req.params.slug },
  });
  if (prod) return res.send(prod);
  res.send({ message: "product not found" });
});
// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Product.findOne(req.params.id, {})
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      return res.status(200).json(product);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
// FIND WISHLIST
router.get("/find-wishlist/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(500).send({ message: "missing data" });
  const wishlist = await Wishlist.findOne({
    where: { userId: id },
    include: [
      {
        model: Product,
      },
    ],
  });
  if (wishlist) return res.send(wishlist);
  res.send({ message: "wishlist not found" });
});
//ADD TO WISHLIST
router.post("/add-to-wishlist", async (req, res) => {
  const product = req.body.product;
  const id = req.body.id;
  if (!id || !product) res.status(500).send({ message: "missing data" });
  let wishlist = await Wishlist.findOne({
    where: { userId: id },
    include: [
      {
        model: Product,
      },
    ],
  });
  const productObj = await Product.findOne({ where: { id: product.id } });
  if (!wishlist) return res.status(500).send({ message: "wishlist not found" });
  await wishlist.addProduct(productObj);
  res.send(wishlist);
});
// REMOVE FROM WISHLIST
router.post("/remove-from-wishlist", async (req, res) => {
  const product = req.body.product;
  const id = req.body.id;
  if (!id || !product) res.status(500).send({ message: "missing data" });
  const wishlist = await Wishlist.findOne({
    where: { userId: id },
    include: [
      {
        model: Product,
      },
    ],
  });
  wishlist.Products.forEach(async (element) => {
    if (element.id === product.id) await wishlist.removeProduct(element);
  });
  res.send({ wishlist });
});
// UPDATE
router.put("/update", async (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Produit introuvable" });
      }

      product
        .update({
          ...product,
          ...req.body,
        })
        .then((updatedProduct) => {
          return res.status(200).json(updatedProduct);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// DESTROY
router.delete("/delete", async (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(400).json({ message: "Produit introuvable" });
      }
      product
        .destroy()
        .then((product) => {
          return res.status(200).json(product);
        })
        .catch((error) => {
          return res.status(400).json(error);
        });
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = router;
