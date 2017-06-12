require('dotenv').config();
const payee = [{"name": "Person1", "wallet": "1983LDmpGo1iBjz9AAqNEStcaGiya8Wx8N", "amount": 66.67},
    {"name": "Person2", "wallet": "17J1VUivqLNzw89k5aEfZz3rBk9Pg7hWyY", "amount": 66.67}]
const should = require('chai').should(),
    wallet = require("../src/wallet.js"),
    newAddress = wallet.getNewAddress()
describe('Wallet', function () {
    describe('#getNewAddress', () => {
        it('New Bitcoin Address', function () {
            newAddress.should.be.a('object');
        });
    });
    describe("#pushPayment", () => {
        it("Pushing payment", () => {
            wallet.pushPayment(payee, {address: newAddress.address, wif: newAddress.wif}, true).then((result) => {
                result.should.be.a('object');
            });
        });
    })
});