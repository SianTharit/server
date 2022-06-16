const omise = require("omise")({
   publicKey: process.env.OMISE_PUBLIC_KEY,
   secretKey: process.env.OMISE_SECRET_KEY,
});

const checkoutCreditCard = async (req, res, next) => {
   try {
      const { email, name, total, token } = req.body;
      const customer = await omise.customers.create({
         email,
         description: name,
         card: token,
      });

      const charge = await omise.charges.create({
         amount: (total * 100).toFixed(0),
         currency: "thb",
         customer: customer.id,
      });
      // console.log("Charge -->", charge);

      res.json({
         amount: total.toFixed(2),
         status: charge.status,
      });
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   checkoutCreditCard,
};
