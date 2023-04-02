const { Message, Client, MessageEmbed } = require("discord.js");
const { Pclient } = require("../../Hosting/Ptero");

module.exports = {//This will be a admin only command
    name: "server-info",
    Description: "Get server information for each server on the panel.",
    Perms: [""],
    Cooldown: 5000,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        //1 Retro, 2 Kitty, 3 Bandz, 4 Turner, 5 Evolutions
        const Admins = ["1006054427637063731", "1058718882044584006", "1065712109293420585", "181189307116027904", "1014511656753188924"];

        if (!Admins.includes(message.author.id)) return message.channel.send("You do not have permission to use this command.");

        Pclient.getServers()
        .then(async servers => {

            const ServersCleaned = servers.map((server) => {
                return `ID: ${server.id} - Name: **${server.name}** - Identifier: **${server.identifier}**`
            }).join("\n");

            const ServerEmbed = new MessageEmbed()
            .setTitle("Retro Hosting Server's")
            .setDescription(ServersCleaned)
            .setColor("#0058b0")
            .setFooter({ text: `Retro Hosting  | Developed By Evolutions#0001` })
            .setTimestamp();

            message.channel.send({ embeds: [ServerEmbed] });


        }).catch(error => console.log(error));
    },
};
