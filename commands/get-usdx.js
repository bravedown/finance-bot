// endpoint http://api.currencylayer.com/
const token = 'eb83c815635c3872e5b418f9175e49ae';
const axios = require("axios");
const decimaljs = require("decimal.js");

module.exports = {
	name: 'get-usdx',
	description: 'Get USDX at a date.',
	args: true, // omit this property and args from execute if you don't want args
    execute(message, args) { // omit args argument if not using args
        const date = args[0];
        const queryURL = `http://api.currencylayer.com/historical?access_key=${token}&date=${date}&currencies=EUR,JPY,GBP,CAD,SEK,CHF`;
        axios.get(queryURL)
            .then(function (response) {
                console.log(response.data.quotes);
                const {USDEUR, USDJPY, USDGBP, USDCAD, USDSEK, USDCHF} = response.data.quotes;
                // let USDX = 50.14348112 * (decimaljs.pow(USDEUR, -0.576)) * (decimaljs.pow(USDJPY, 0.136)) 
                //     * (decimaljs.pow(USDGBP, 0.119)) * (decimaljs.pow(USDCAD, 0.091)) * (decimaljs.pow(USDSEK, 0.042)) * (decimaljs.pow(USDCHF, 0.036));
                let USDX = decimaljs.mul(decimaljs.mul(decimaljs.mul(decimaljs.mul(decimaljs.mul(decimaljs.mul(50.14348112, (decimaljs.pow(USDEUR, 0.576))), (decimaljs.pow(USDJPY, 0.136))), (decimaljs.pow(USDGBP, 0.119))), (decimaljs.pow(USDCAD, 0.091))), (decimaljs.pow(USDSEK, 0.042))), (decimaljs.pow(USDCHF, 0.036)));
                message.channel.send(`USDX at date ${date} was ${USDX}`)
            })
            .catch(function (error) {
                console.log(error);
        });
	},
};
