require('ffmpeg');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports.run = async (client, message, args) => {
    if(message.member.voice.channel){
        message.channel.send('SOCIEDADE MUAHAHAHAHAHA', {
            files: [
                "./Image/herumutus_creepypasta.PNG"
            ]
        });
    }
    else{
        message.channel.send("Amigão, tu precisa estar conectado em um canal de voz... PENSA UM POUCO ANIMAL!!!!!");
    }
};