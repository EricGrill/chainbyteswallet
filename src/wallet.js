const bitcoin = require("bitcoinjs-lib");
const logger = require('winston');
logger.level = "debug";
const apiCall = require('../src/apiCall.js');
const pushtx = require('blockchain.info/pushtx');
let fee = 50000;  // Need to create a more dynamic fee
module.exports = {
    getNewAddress: () => {
        const keyPair = bitcoin.ECPair.makeRandom();
        return {address: keyPair.getAddress(), wif: keyPair.toWIF()};
    },
    pushPayment: (payees, payor) => {
        return new Promise((fulfill, reject) => {
            apiCall.getData("https://www.bitstamp.net/api/ticker/").then((btcprice) => {
                const priceBTC = btcprice.ask;
                let query = "https://blockchain.info/address/" + payor.address + "?format=json";
                apiCall.getData(query).then((blockchaindata) => {
                    let key = bitcoin.ECPair.fromWIF(payor.wif);
                    let tx = new bitcoin.TransactionBuilder();
                    let amount = 0;
                    payees.forEach((payee) => {
                        payee.btcamount = Number(((payee.amount / priceBTC) * 100000000).toFixed(0));
                        logger.info("Sending ", payee.btcamount);
                        amount = amount + payee.btcamount;  // probably a cleaner way to do this
                    });
                    let Total = 0;  // Total of outputs so we know to send remainder back to our public address
                    for (let transactionIndex = 0; transactionIndex < blockchaindata.txs.length; transactionIndex++) {
                        for (let outputsIndex = 0; outputsIndex < blockchaindata.txs[transactionIndex].out.length; outputsIndex++) {
                            if (blockchaindata.txs[transactionIndex].out[outputsIndex].addr == payor.address) {
                                const out = blockchaindata.txs[transactionIndex].out[outputsIndex];
                                if (!out.spent && Total < amount) {
                                    if (out.value > amount) {
                                        Total = Total + Number(out.value);
                                        logger.log('info', 'need %d for %d out value total: %d', amount, out.value, Total);
                                        tx.addInput(blockchaindata.txs[transactionIndex].hash, outputsIndex);
                                    }
                                }
                            }
                        }
                        //   console.log(data.txs[q]);
                    }
                    if (fee > amount) {  // Sending dust
                        logger.debug("Fee is more than amount sending");
                        fee = amount;
                    }
                    if (Total < amount && process.env.NODE_ENV != undefined) {
                        reject("Not enough coin to pay total " + Total + "  " + amount);
                        return;
                    }
                    logger.log('debug', "Total: " + Total);
                    logger.log('debug', "Amount: " + amount);
                    logger.log('debug', "Fee: " + fee);
                    logger.log('info', 'Sending back %d', Number(Total - amount - fee));
                    payees.forEach((payee) => {
                        logger.log('debug', payee);
                        tx.addOutput(payee.wallet, payee.btcamount);
                    });
                    tx.addOutput(payor.address, Number(Total - (amount + fee)));
                    // console.log(tx);
                    tx.sign(0, key);
                    logger.log("info", tx);
                    const lengthTransaction = tx.build().toHex().length / 2;
                    console.log("Transaction size: ", lengthTransaction);
                    if (process.env.NODE_ENV == undefined) {  // if there is no NODE_ENV its in production and actually send
                        console.log("Sending");
                        pushtx.pushtx(tx.build().toHex(), null).then((result) => {
                            fulfill(amount)
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        logger.log('info', 'Dev environment not sending');
                        fulfill(amount);
                    }
                });
            })
        });
    }
};

