const { Message, Client, MessageEmbed } = require("discord.js");
const { Pclient } = require("../../Hosting/Ptero");

module.exports = {
    name: "nodes",
    Description: "Get a list of each node as well as its information.",
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

        Pclient.getNodes().then(
            nodes => {

                const Cleaned = nodes.map(node => {
                    return `**Name:** ${node.name}\n**ID:** ${node.id}\n**Description:** ${node.description || "No Description"}\n**Public:** ${node.public}\n**Memory:** ${node.memory}\n**Disk:** ${node.disk}\n**Daemon Listen:** ${node.daemonListen}\n**Daemon Base:** ${node.daemonBase}\n**Created At:** ${node.createdAt}\n**Updated At:** ${node.updatedAt}\n\n`
                }).join("\n");

                const NodeEmbed = new MessageEmbed()
                    .setTitle(`Retro Hosting Node Information`)
                    .setDescription(`${Cleaned}`)
                    .setColor("#0058b0")
                    .setFooter({ text: `Retro Hosting  | Developed By Evolutions#0001` })
                    .setTimestamp();

                message.channel.send({ embeds: [NodeEmbed] });
            });
    },
};
