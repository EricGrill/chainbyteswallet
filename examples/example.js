const wallet = require("../src/wallet.js"),
    newAddress = wallet.getNewAddress()  // New wallet nothing will be in it to pay so rest will fail
const payor = {
    "address": newAddress.address,
    "wif": newAddress.wif
}
const payee = [{"name": "Person1", "wallet": "1983LDmpGo1iBjz9AAqNEStcaGiya8Wx8N", "amount": 66.67},
    {"name": "Person2", "wallet": "17J1VUivqLNzw89k5aEfZz3rBk9Pg7hWyY", "amount": 66.67}]
wallet.pushPayment(payee, payor, true).then((result) => {
    console.log(result);
}).catch((err) => {
    console.error(err);
});