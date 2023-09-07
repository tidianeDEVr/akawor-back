const express = require("express");
const { PAYTECH, EUR_TO_XOF, APP_URL } = require("../env");
const router = express.Router();

router.post("/paytech", async (req, res) => {
  let fetch = require("node-fetch"); // http client
  let item_price = req.body.amount;
  let reference = req.body.reference;
    if(!item_price || !reference) return res.status(500).send('missing data !');
  if (req.body.currency == "XOF") item_price = req.body.amount * EUR_TO_XOF;
  let params = {
    item_name: "Commande",
    // item_price: item_price,
    // currency: req.body.currency,
    item_price: 100,
    currency: "XOF",
    ref_command: `akawor-${new Date()}`,
    command_name: "Paiement via PayTech",
    env: "test",
    success_url: `${APP_URL}/v1/api/command/confirm-payment?ref=${reference}`,
    ipn_url:"https://domaine.com/ipn",
    cancel_url:"https://domaine.com/cancel",
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

  fetch(PAYTECH.PAYMENT_REQUEST_URL, {
    method: "POST",
    body: JSON.stringify(params),
    headers: headers,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      res.send(jsonResponse);
    });
});

module.exports = router;
