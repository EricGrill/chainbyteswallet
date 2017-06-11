const should = require('chai').should(),
    wallet = require("../src/wallet.js"),
    newAddress = wallet.getNewAddress()
describe('Wallet', function () {
    describe('#getNewAddress', function () {
        it('New Bitcoin Address', function () {
            newAddress.should.be.a('object');
        });
    });
});