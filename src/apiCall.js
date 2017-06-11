const pushtx = require('blockchain.info/pushtx');
const blockexplorer = require('blockchain.info/blockexplorer');
const request = require("request");


module.exports = {
    getData: (endPoint) => {
        return new Promise( (fulfill, reject) => { // Create Promise
            request({
                method: 'GET',
                url: endPoint,
                headers: {
                    'Content-Type': 'application/json',
                },
            },  (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else {
                    fulfill(JSON.parse(body));
                }
            });
        });
    }
};
