import 'dotenv/config.js';
import { replyExceptionMessage } from './Helpers/exception_handler.js';

import express from 'express';
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT || 5000); 

import { Client, MessageEmbed } from 'discord.js';
const client = new Client();

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require("./config.json");

client.on('ready', () => {
    console.log("Im' ready!");
    for(var guild of client.guilds.cache.entries()){
        for(var channel of guild[1].channels.cache.entries()){
            if(channel[1].type == 'text' && guild[0] != "382695161815367681"){
                const embed = new MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Estou de volta!')
                    .setURL('')
                    .setAuthor('Herumutu\'s BOT','https://www.iconsdb.com/icons/preview/guacamole-green/circle-xxl.png')
                    .setDescription(`Estou Online novamente, digite '${config.prefix}help' para ver os meus comandos`)
                    .setThumbnail('https://raw.githubusercontent.com/ashwurz/Herumutus-Bot/master/Image/Bot_Icon_Uptade.png')
                    .setTimestamp(new Date())
                    .setFooter("© Herumutu's BOT Corporation");

                channel[1].send(embed);
                break;
            }
        }
    }

    client.user.setActivity(`${config.prefix}help`,{type: 'LISTENING'});
});

client.on("message", async (message) =>  {
    if(message.author.bot) return;
    if(message.channel.type == "dm"){
        message.channel.send("Olá, você pode digitar 'h!help' no seu servidor de discord para ver uma lista com todos os meus comandos!");
    }
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;
    const args = message.content.trim().slice(config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    try{
        const { run } = await import("./commands/" + command + ".js")
        run(client, message, args);
    }
    catch(err){
        replyExceptionMessage(message, err, "Desculpe, eu não entendi esse comando!");
    }
});

client.login(process.env.TOKEN);