module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	execute(message) {
		console.log(message.channel.get("id"));
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\n`);
	},
};
