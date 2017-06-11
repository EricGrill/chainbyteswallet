const wallet = require("./src/wallet.js");
wallet.getNewAddress().then(function(result)
{
    console.log(result);
})