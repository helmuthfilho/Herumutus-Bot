require('dotenv/config');

const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT || 5000); 

const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
    console.log("Im' ready!");
});

client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm"){
        message.channel.send("Olá, você pode digitar 'h!help' no seu servidor de discord para ver uma lista com todos os meus comandos!");
    }
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;
    const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    try{
        const commandFile  = require('./commands/' + command + ".js");
        commandFile.run(client,message,args);
    }
    catch(err){
        console.log("Error:" + err)
        message.reply("Desculpe, eu não entendi esse comando!");
    }
});

client.login(process.env.TOKEN);