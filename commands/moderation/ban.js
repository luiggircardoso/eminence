const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require('discord.js');

const BannedEmbed = new EmbedBuilder()
    .setColor('White')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`🔨 | The user has been banned`)
    .setTimestamp()

const ErrorEmbed = new EmbedBuilder()
    .setColor('Yellow')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`⚠️ | Something went wrong`)
    .setDescription('There was an error trying to ban the user.')
    .setTimestamp()

module.exports = {
    data: new SlashCommandBuilder()
            .setName('ban')
            .setDescription('Ban a user from the server')
            .addUserOption(option =>
		        option
                .setName('user')
			    .setDescription('User to ban.')
                .setRequired(true)
            )
            .addStringOption(option => 
                option 
                    .setName('reason')
                    .setDescription('Reason for the ban.')
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason') ?? "No reason provided."

        try {
            interaction.guild.members.ban(user)
        } catch (error) {
            console.log(error)
            return interaction.reply({ embed: ErrorEmbed })
        }
    }
};