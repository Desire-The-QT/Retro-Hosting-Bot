const { Client, Collection } = require("discord.js");

console.clear();

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.ptero = require("./Hosting/Ptero");
client.buttons = new Collection();

// Initializing the project
require("./handler")(client);

client.login(client.config.token);