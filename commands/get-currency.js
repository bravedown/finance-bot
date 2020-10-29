// endpoint http://api.currencylayer.com/
const token = 'eb83c815635c3872e5b418f9175e49ae';
const axios = require("axios");

module.exports = {
	name: 'get-currency',
	description: 'Get currency at a date.',
	args: true, // omit this property and args from execute if you don't want args
    execute(message, args) { // omit args argument if not using args
        const date = args[0];
        const queryURL = `http://api.currencylayer.com/historical?access_key=${token}&date=${date}&currencies=GBP,ALL,USD`;
        axios.get(queryURL)
            .then(function (response) {
                message.channel.send(`USD to GBP at date ${date} rate was ${response.data.quotes.USDGBP}`)
            })
            .catch(function (error) {
                console.log(error);
        });
	},
};
