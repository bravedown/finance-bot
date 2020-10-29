// endpoint http://api.currencylayer.com/
const axios = require("axios");
const csv = require("csvtojson");

module.exports = {
	name: 'test',
    description: 'Get USDX at a date.',
    cooldown: 0,
    execute(message, args) { // omit args argument if not using args
        let daysAgo = args.length < 1 ? 1 : +args[0];
        let today = Date.now() / 1000 + 86400;
        today -= today % 86400;
        let firstDay = today - (86400 * (daysAgo + 1));
        const queryURL = `https://query1.finance.yahoo.com/v7/finance/download/DX-Y.NYB?period1=${firstDay}&period2=${today}&interval=1d&events=history`;
        // const queryURL = `https://query1.finance.yahoo.com/v7/finance/download/DX-Y.NYB?range=1y&interval=1d&events=history`;

        axios.get(queryURL)
            .then(function (response) {
                csv()
                .fromString(response.data)
                .then((arr)=>{ 
                    let dayOneClose = arr[0].Close;
                    if (dayOneClose === null) dayOneClose = arr[1].Close;
                    let todaysClose = arr[arr.length - 1].Close;
                    let percentChange = todaysClose / dayOneClose - 1;
                    console.log(`Data from ${daysAgo} days ago`);
                    console.log(`Day 1 close: ${dayOneClose}\nToday's close: ${todaysClose}\nPercent Change: ${percentChange * 100}`);
                    console.log('-----------------------');
                    message.channel.send(`Percent change of USDX from ${daysAgo} days ago is ${(percentChange * 100).toFixed(4)}%`);
                });
            })
            .catch(function (error) {
                console.log(error);
        });
	},
};

//we have the function to get percent change over time
// set interval to call function every so often
// if above a users set threshold, send notif
