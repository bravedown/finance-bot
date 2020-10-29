module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo' && args.length === 1) {
			return message.channel.send('bar');
		}

		message.channel.send(`Args: ${args}`);
	},
};
