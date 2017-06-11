require('dotenv').config();
const payee = JSON.parse(process.env.payee);
const payor = JSON.parse(process.env.payor);
const should = require('chai').should(),
    wallet = require("../src/wallet.js"),
    newAddress = wallet.getNewAddress()
describe('Wallet', function () {
    describe('#getNewAddress', function () {
        it('New Bitcoin Address', function () {
            newAddress.should.be.a('object');
        });
    });
    describe("#pushPayment", () => {
        it("Pushing payment", () => {
            wallet.pushPayment(payee, payor, true).then((result) => {
                result.should.be.a('object');
            });
        });
    })
});