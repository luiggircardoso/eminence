const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require('discord.js');

const BannedEmbed = new EmbedBuilder()
    .setColor('White')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`The user has been kicked`)
    .setTimestamp()


const IDErrorEmbed = new EmbedBuilder()
    .setColor('Red')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`Please provide a user ID to ban.`)
    .setDescription('Use the user\'s ID, not their username.')
    .setTimestamp()

const ErrorEmbed = new EmbedBuilder()
    .setColor('Red')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`Please provide a user ID to kick.`)
    .setDescription('There was an error trying to kick the user.')
    .setTimestamp()

module.exports = {
    data: new SlashCommandBuilder()
            .setName('kick')
            .setDescription('Kick a user from the server')
            .addStringOption(option =>
		        option.setName('userid')
			    .setDescription('User ID of the user to kick. Use the user\'s ID, not their username.')
            .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const userId = interaction.options.getString('userid');
        if (!userId) {
            return interaction.reply({ embeds: [IDErrorEmbed], flags: MessageFlags.Ephemeral });
        }

        try {
            const user = await interaction.guild.members.ban(userId);
            return interaction.reply({ embeds: [BannedEmbed], flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error(error);
            return interaction.reply({ embeds: [ErrorEmbed], flags: MessageFlags.Ephemeral });
        }
    }
};