import { SlashCommandBuilder, PermissionFlagsBits  } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member and kick them.')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('The member to kick')
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);
export const category = 'moderation';
export async function execute(interaction) {
    await interaction.reply('user kicked!');
}