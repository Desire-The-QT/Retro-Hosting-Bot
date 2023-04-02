const { Message, Client, MessageEmbed } = require("discord.js");
const { Pclient } = require("../../Hosting/Ptero");

module.exports = {
    name: "users",
    Description: "Get all users on the panel.",
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

        Pclient.getUsers().then(users => {

            const Cleaned = users.map((user) => {
                return `ID: ${user.id} - Name: **${user.username}** - Email: **${user.email}**`
            }).join("\n");

            const UserEmbed = new MessageEmbed()
            .setTitle("Retro Hosting Users")
            .setDescription(`${Cleaned}`)
            .setColor("#0058b0")
            .setFooter({ text: `Retro Hosting  | Developed By Evolutions#0001` })
            .setTimestamp();

            message.channel.send({ embeds: [UserEmbed] });

        });
    },
};


/*

 User {
    id: 1,
    externalId: null,
    uuid: '766c357d-a8f1-4d66-8be9-205f942a802f',
    internalId: '766c357d-a8f1-4d66-8be9-205f942a802f',
    username: 'admin',
    email: 'mcfattyfatpants@outlook.com',
    firstName: 'admin',
    lastName: 'admin',
    fullName: 'admin admin',
    language: 'en',
    rootAdmin: true,
    twoFactor: false,
    updatedAt: 2023-03-28T22:53:06.000Z,
    createdAt: 2023-03-25T20:14:29.000Z,
    api: AdminClient {
      url: 'https://retro-hosting.com',
      apiKey: 'ptla_9E9ohXkO4Tdnkc9mpmTExk0Dn08MHHTyBzmoEHbgiZO',
      baseUrl: 'https://retro-hosting.com/api'
    },
    pagination: Pagination {
      total: 24,
      count: 24,
      pageSize: 50,
      currentPage: 1,
      totalPages: 1,
      links: {}
    }
  },

*/