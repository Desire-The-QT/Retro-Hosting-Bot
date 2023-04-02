const client = require("../index");

const Red = "\x1b[31m";
const Green = "\x1b[32m";
const Reset = "\x1b[0m";

client.on("ready", () => {
    
const Activities = [
    "Retro Hosting",
    "Developed By Evolutions#0001",
    "https://retro-hosting.com/",
    "Use Cod Desire To Get 10% Off Your Order"
];

setInterval(() => {
    const index = Math.floor(Math.random() * (Activities.length - 1) + 1);
    client.user.setActivity(Activities[index], { type: "PLAYING" });

}, 3000);

console.log(`${Green}[SUCCESS]${Reset} Logged in as ${client.user.tag}!`);
console.log(`${Green}[SUCCESS]${Reset} Loaded ${client.commands.size + client.slashCommands.size} commands!`);
console.log(`${Green}[SUCCESS]${Reset} Changing status every 3 seconds!`);

});