const client = require("../index");

client.on("error", (err) => {
    console.log(err.message);
});

client.on("warn", (warn) => {
    console.log(warn.message);
});

process.on("uncaughtException", (err, origin) => {
    console.log(`Error: ${err}\nOrigin: ${origin}`);

});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
});