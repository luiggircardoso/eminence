const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('I think you know what does this do lmao'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
