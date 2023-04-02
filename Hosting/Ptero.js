const Config = require("../Data/Retro.json");
const pterodactyl = require("pterodactyl.js");

const APIKey = Config.ApiKey;
const Link = Config.Link;

//const Pclient = new pterodactyl.Builder().setURL(Link).setAPIKey(APIKey).asAdmin();

const Pclient = new pterodactyl.AdminClient(Link, APIKey);



module.exports = {
    Pclient: Pclient
};