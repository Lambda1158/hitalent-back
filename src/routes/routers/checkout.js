const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
// const nodemailer = require("nodemailer");
// const { templateSuccess, templateFailure, templatePending } = require('../utils/Templates/emailTemplates');

mercadopago.configure({
  access_token:
    "TEST-4520848914576808-120421-bd25a5c12547bd84156767703e240f4f-1032686377",
});

router.post("/mercadopago", async (req, res) => {
  const { payloadMp } = req.body;
  console.log('back payloadmp', payloadMp)
  
  let itemsCart = payloadMp?.items?.map((e) => 
    ({title: e.title,
    unit_price: e.unit_price,
    quantity: e.quantity
    })
  )

  let preference = {
    // items: [
    //   {
    //     title: title,
    //     unit_price: total,
    //     quantity: 1,
    //   },
    // ],
    items: itemsCart,

    back_urls: {
      success: "http://localhost:3000/checkoutApro",
      failure: "http://localhost:3000/home",
      pending: "http://localhost:3000/home",
    },
  };

  let answer = await mercadopago.preferences.create(preference);

  const response = answer.body.id;
  const init_points = answer.body.init_point;
  res.json({ response: response, init_points: init_points });
});

module.exports = router;
