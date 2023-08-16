const express = require("express");
const router = express.Router();
const { Order, OrderLine, User } = require("../models/");

// INSERT
router.post("/insert", async (req, res) => {
  const {
    orderIsPayed,
    orderDescription,
    orderClientPhoneNumber,
    orderClientEmail,
    orderClientFirstName,
    orderClientLastName,
    orderClientCity,
    orderClientCountry,
    orderClientAddress,
  } = req.body.order;
  const cart = req.body.cart;
  if (
    !orderClientPhoneNumber ||
    !orderClientEmail ||
    !orderClientFirstName ||
    !orderClientLastName ||
    !orderClientCity ||
    !orderClientCountry ||
    !orderClientAddress || 
    !cart
  ) return res.status(400).send({message: 'missing data !'})
  var orderToAdd = new Order()
  if (orderClientEmail) {
    await User.findOne({ where: { userEmail: orderClientEmail } }).then(
      (res) => {
        if(res.id) orderToAdd.UserId = res.id;
      }
    );
  }
  if(orderDescription) orderToAdd.orderDescription = orderDescription;
  orderToAdd.orderClientPhoneNumber = orderClientPhoneNumber;
  orderToAdd.orderClientEmail = orderClientEmail;
  orderToAdd.orderClientFirstName = orderClientFirstName;
  orderToAdd.orderClientLastName = orderClientLastName;
  orderToAdd.orderClientCity = orderClientCity;
  orderToAdd.orderClientCountry = orderClientCountry;
  orderToAdd.orderClientAddress = orderClientAddress;
  await orderToAdd.save();

  // ORDER LINE 
  var orderLine = new OrderLine();
  orderLine.OrderId = orderToAdd.id;
  orderLine.orderLineTotalPrice = 0;
  for(elt of cart) {
    if(!elt.product.productPricePromo) {
      orderLine.orderLineTotalPrice = elt.product.productPrice * elt.quantity;
    } else {
      orderLine.orderLineTotalPrice = elt.product.productPricePromo * elt.quantity;
    }
  }
  orderLine.orderLineJsonCart = JSON.stringify(cart);
  await orderLine.save();
  res.send({order: orderToAdd});
});

// GET BY CLIENT
router.get('/client/:email', async (req, res) => {
  const email = req.params.email
  Order.findAll({where: {orderClientEmail: email}, include: [{model: OrderLine}]})
  .then((orders)=>{
    res.send(orders)
  })
})

// FIND ALL
router.get("/find-all", async (req, res) => {
  Order.findAll({include:[{model:OrderLine}]})
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// FIND RECENTS
router.get('/find-recents', async (req, res) => {
  Order.findAll({
    limit: 10,
    order: [[ 'createdAt', 'DESC' ]],
    include: [{model: OrderLine}]
  })
    .then((orders) => {
      return res.status(200).json(orders);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
})

// FIND BY ID
router.get("/find-by-id", async (req, res) => {
  Order.findById(req.params.id, {})
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Commande introuvable" });
      }

      return res.status(200).json(order);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

// UPDATE
router.put("/update", async (req, res) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Commande introuvable" });
      }

      order
        .update({
          ...order,
          ...req.body,
        })
        .then((updatedOrder) => {
          return res.status(200).json(updatedOrder);
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
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(400).json({ message: "Commande introuvable" });
      }
      order
        .destroy()
        .then((order) => {
          return res.status(200).json(order);
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
