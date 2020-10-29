const users = require("../db/users.json");
const fs = require("fs");
const path = require("path");

module.exports = {
	name: 'set-notif',
    description: 'Set notifications to be sent to you if percent change in a stock over x days exceeds a given threshold.\nSyntax: ``!set-notif <stock> <percent-threshold> ...<days>``',
	args: true, // omit this property and args from execute if you don't want args
	execute(message, args) { // omit args argument if not using args

        let userID = message.author.id;
        console.log(userID);
        if (!("" + userID in users) ) users[userID] = {};
        
        if (!("notifications" in users[userID]) ) users[userID]["notifications"] = [];
        let notifObj = {
            stock: args[0],
            percent_threshold: args[1],
            days: args.slice(2)
        };
        console.log(notifObj);
        users[userID].notifications.push(notifObj)
        fs.writeFile(path.join(__dirname, "..", "db", "users.json"), JSON.stringify(users, null, '\t'), (err)=>{
            if (err) return message.channel.send("There was an error setting your notification.")
            message.channel.send("Notification set successfully!")
        });

	},
};
