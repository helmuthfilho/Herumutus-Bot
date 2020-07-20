require('ffmpeg');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports.run = async (client, message, args) => {
    if(message.member.voice.channel){
        message.channel.send('SOCIEDADE MUAHAHAHAHAHA', {
            files: [
                "./Image/herumutus_creepypasta.png"
            ]
        });

        message.member.voice.channel.join()
        .then(connection =>{
            const stream = ytdl('https://www.youtube.com/watch?v=NwN-hRaQaXM');
    
            const DJ = connection.play(stream, streamOptions);
            DJ.on('finish', () =>{
                message.member.voice.channel.leave();
            });
        })
        .catch(console.error);
    }
    else{
        message.channel.send("Amigão, tu precisa estar conectado em um canal de voz... PENSA UM POUCO ANIMAL!!!!!");
    }
};