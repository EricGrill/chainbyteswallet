const bitcoin = require("bitcoinjs-lib");
module.exports = {
    getNewAddress: function () {
        var keyPair = bitcoin.ECPair.makeRandom();
        return {address: keyPair.getAddress(), wif: keyPair.toWIF()};
    }
}

