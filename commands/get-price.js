// GET /stock/{symbol}/chart/{range}/{date}
const axios = require("axios");
const token = 'pk_bdf110a9c2a3496bb4b9f35bbdadf953';
module.exports = {
	name: 'get-price',
	description: 'Get the price of a stock on a specific date',
	args: true, // omit this property and args from execute if you don't want args
    execute(message, args) { // omit args argument if not using args
        const symbol = args[0];
        const date = args[1];
		axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/date/${date}?chartByDay=true&token=${token}`)
            .then(function (response) {
                message.channel.send(`Close price on ${date} for ${symbol} was ${response.data[0].close}`);
            })
            .catch(function (error) {
                console.log(error);
        });
        
        
	},
};
