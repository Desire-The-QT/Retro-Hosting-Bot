const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "delete",
    Description: "Delete a user from Retro Hosting web panel",
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

        const user = args[0];

        if (!user) return message.channel.send("Please provide a user to delete");

    },
};
