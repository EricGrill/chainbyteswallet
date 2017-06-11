const wallet = require("./src/wallet.js");
require('dotenv').config();
console.log("payee", process.env.payee);
const payee = JSON.parse(process.env.payee);
const payor = JSON.parse(process.env.payor);
console.log(payor.address);
wallet.pushPayment(payee, payor, true).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});
console.log(payee, payor, true);
//wallet.pushPayment()



