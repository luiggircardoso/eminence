const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require('discord.js');

const BannedEmbed = new EmbedBuilder()
    .setColor('White')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`The user has been kicked`)
    .setTimestamp()

const ErrorEmbed = new EmbedBuilder()
    .setColor('Yellow')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`⚠️ | Something went wrong.`)
    .setDescription('There was an error trying to kick the user.')
    .setTimestamp()

module.exports = {
    data: new SlashCommandBuilder()
            .setName('kick')
            .setDescription('Kick a user from the server')
            .addUserOption(option =>
		        option.setName('user')
			    .setDescription('User to kick.')
                .setRequired(true)
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        user.kick()
    }
};