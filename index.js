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
    console.log("TO PRONTO!");
});

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
        message.channel.send("MANO, CÊ É BURRO? Eu não reconheço esse comando, aprende a escrever, mané!");
    }
});

client.login(process.env.TOKEN);