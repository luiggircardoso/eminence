const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require('discord.js');

const ErrorEmbed = new EmbedBuilder()
    .setColor('Yellow')
    .setAuthor({ name: 'Eminence' }) 
    .setTitle(`⚠️ | Something went wrong...`)
    .setDescription('Check if the time and the user are valid.')
    .setTimestamp()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user for a specified duration')
        .addUserOption(option =>
                option
                    .setName('target')
                    .setDescription("Select an user to Ban.")
                    .setRequired(true)
                )
            .addIntegerOption(option => 
                option
                    .setName('time')
                    .setDescription('In minutes, how much time will the user be out.')
                    .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

        async execute(interaction) {
            const member = interaction.options.getMember('target');
            const time = interaction.options.getInteger('time');
            var timeoutTime;
            
            const TimeoutEmbed = new EmbedBuilder()
                .setAuthor({ name: 'Eminence' })
                .setTitle(`${target.username} was put on timeout for ${time} minutes.`)
                .setColor('White')
                .setDescription('You are not able to take someone out of timeouts using commands.')

            if (time == 0 || !time) {
               return interaction.reply({ embed: ErrorEmbed, flags: MessageFlags.Ephemeral });
            } else {
                timeoutTime = time * 60000
            }

           try {
                member.timeout(timeoutTime);
                interaction.reply({ embed: TimeoutEmbed, flags: MessageFlags.Ephemeral });
           } catch (error) {
                console.error(error)
                interaction.reply({ embed: ErrorEmbed, flags: MessageFlags.Ephemeral });
           }
        }

}
