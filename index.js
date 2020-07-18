require('dotenv/config');

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm"){
        message.channel.send("SAI DAQUI MALUCO!");
    }
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;
    const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    try{
        const commandFile  = require('./commands/' + command + ".js");
        commandFile.run(client,message,args);
    }
    catch(err){
        console.log("Erro:" + err)
    }
});

client.login(process.env.TOKEN);