require('ffmpeg');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};

module.exports.run = async (client, message, args) => {

    message.reply("Este comando está interditado, no momento foi mal maninho 😭");
    
    return;

    var creepyList = [
        "./Image/herumutus_creepypasta.png",
        "./Image/sad_man.png",
        "./Image/world_destroyer.png",
        "./Image/mashitas_curse.png"
    ];

    var creepyRandom = creepyList[Math.floor(Math.random() * creepyList.length)];

    if(message.member.voice.channel){
        message.channel.send('SOCIEDADE MUAHAHAHAHAHA', {
            files: [
                creepyRandom
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
        message.reply("Você precisa estar conectado em um canal de voz para usar esse comando!!");
    }
};