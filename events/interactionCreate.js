const { Collection, MessageEmbed } = require("discord.js");
const client = require("../index");
const Timeout = new Collection();
const ms = require("ms");

function NoPerms(Username, Perms, Command) {
    const NoPermsEmbed = new MessageEmbed()
        .setTitle("Retro Hosting Permissions Handler")
        .addFields(
            { name: `Error Message`, value: `User doesn't have permissions`, inline: false },
            { name: `Username`, value: `${Username}`, inline: false },
            { name: `Permissions Needed`, value: `**${Perms}**`, inline: false },
            { name: `Command`, value: `**${Command}**`, inline: false },
        )
        .setColor("RED")
        .setFooter({ text: `Retro Hosting Permissions Handler | Developed By Evolutions#0001` })
        .setTimestamp()
    return NoPermsEmbed;
}

function OnCooldown(Username, Cooldown, Command) {
    const OnCooldownEmbed = new MessageEmbed()
        .setTitle("Retro Hosting Cooldown Handler")
        .addFields(
            { name: `Username`, value: `${Username}`, inline: false },
            { name: `Cooldown`, value: `${Cooldown}`, inline: false },
            { name: `Command`, value: `${Command}`, inline: false }
        )
        .setColor("RED")
        .setFooter({ text: `Retro Hosting Cooldown Handler | Developed By Evolutions#0001` })
        .setTimestamp()
    return OnCooldownEmbed;
}

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        if (cmd) {

            if (cmd.Perms && !interaction.member.permissions.has(cmd.Perms)) return interaction.followUp({ embeds: [NoPerms(interaction.user.tag, cmd.Perms, cmd.name)] });

            if (cmd.Cooldown) {
                if (Timeout.has(`${cmd.name}${interaction.user.id}`)) return interaction.followUp({ embeds: [OnCooldown(interaction.user.tag, ms(Timeout.get(`${cmd.name}${interaction.user.id}`) - Date.now(), { long: false }), cmd.name)], content: `You are on a \`${ms(Timeout.get(`${cmd.name}${interaction.user.id}`) - Date.now(), { long: false })}\` cooldown.` })
                Timeout.set(`${cmd.name}${interaction.user.id}`, Date.now() + cmd.Cooldown);
                setTimeout(() => {
                    Timeout.delete(`${cmd.name}${interaction.user.id}`);
                }, cmd.Cooldown);
            }
        }

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Button Handling
    if (interaction.isButton()) {
        const button = client.buttons.get(interaction.customId);
        if (!button) return;

        try {
            await button.execute(interaction);
        } catch (err) {
            console.log(err.message);
            await interaction.replay({ content: `Seems to have been a error.` });
        }
    } else {
        return;
    }
});