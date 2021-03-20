require('ffmpeg');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 10};

module.exports.run = async (client, message, args) => {
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

        const connection = await message.member.voice.channel.join();

        const stream = ytdl('https://www.youtube.com/watch?v=NwN-hRaQaXM');

        console.log(streamOptions);

        connection.play(stream, streamOptions)
        .on('finish', () =>{
            message.member.voice.channel.leave();
        });
    }
    else{
        message.reply("Você precisa estar conectado em um canal de voz para usar esse comando!!");
    }
};