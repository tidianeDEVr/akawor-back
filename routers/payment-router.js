const express = require("express");
const { PAYTECH, EUR_TO_XOF } = require("../env");
const router = express.Router();

router.post("/paytech", async (req, res) => {
  let paymentRequestUrl = "https://paytech.sn/api/payment/request-payment";
  let fetch = require("node-fetch"); // http client
  let item_price = req.body.amount;
  if(req.body.currency == 'XOF') item_price = req.body.amount * EUR_TO_XOF;
  let params = {
    item_name: "Commande client",
    item_price: item_price,
    currency: req.body.currency,
    ref_command: `akawor-${new Date()}`,
    command_name: "Paiement via PayTech",
    env: "test",
    ipn_url: "https://domaine.com/ipn",
    success_url: "https://domaine.com/success",
    cancel_url: "https://domaine.com/cancel",
    custom_field: JSON.stringify({
      custom_fiel1: "value_1",
      custom_fiel2: "value_2",
    }),
  };

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    API_KEY: PAYTECH.KEY,
    API_SECRET: PAYTECH.SECRET,
  };

  fetch(paymentRequestUrl, {
    method: "POST",
    body: JSON.stringify(params),
    headers: headers,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
      res.send(jsonResponse);
    });
});

module.exports = router;
