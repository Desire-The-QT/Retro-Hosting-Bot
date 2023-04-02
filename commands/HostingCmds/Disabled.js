const { Message, Client, MessageEmbed } = require("discord.js");
const { Pclient } = require("../../Hosting/Ptero");

module.exports = {
    name: "server",
    Description: "Get information on a server using its ID.",
    aliases: ['p'],
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

        const ServerID = args[0];

        if (!ServerID) return message.channel.send(`${message.author} Please provide a valid server ID.`);

        message.channel.send(`This command is currently disabled`); return;//Broke ig

        Pclient.getServer(ServerID).then(
            server => {
                const ServerEmbed = new MessageEmbed()
                    .setTitle(`Server Information for ${server.name}`)
                    .addFields(
                        {
                            name: "ID",
                            value: `${server.id}`,
                            inline: true
                        },
                        {
                            name: "Identifier",
                            value: `${server.identifier}`,
                            inline: true
                        },
                        {
                            name: "Suspended",
                            value: `${server.suspended}`,
                            inline: true
                        },
                        {
                            name: "Created At",
                            value: `${server.createdAt}`,
                            inline: true
                        })
                    .setColor("#0058b0")
                    .setFooter({ text: `Retro Hosting  | Developed By Evolutions#0001` })
                    .setTimestamp();

                message.channel.send({ embeds: [ServerEmbed] });

            }).catch(error => console.log(error.message) && message.channel.send(`${message.author} Error, Either the server ID is invalid or we are experiencing a issue.`));
    },
};
