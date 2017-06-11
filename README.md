# Chainbyteswallet

Simple Standalone Wallet

## Installation

  npm install chainbyteswallet --save

## To Use

```
// Must set the address and wif to your public address and private key to send from

const wallet = require("chainbyteswallet");

const payor = {"address": address, "wif": wif};
const payee = [{"name": "Person1", "wallet": "1983LDmpGo1iBjz9AAqNEStcaGiya8Wx8N", "amount": 5},
                {"name": "Person2", "wallet": "17J1VUivqLNzw89k5aEfZz3rBk9Pg7hWyY", "amount": 5}]


// 2 people paid $5 USD worth of btc name,wallet,amount array of bitcoin wallets to send usdAmount to.
wallet.pushPayment(payee,payor,true).then((result)=> {
    console.log(result);
})
```

## Tests

  npm test

