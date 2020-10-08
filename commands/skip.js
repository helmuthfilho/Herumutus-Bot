const ytdl = require('ytdl-core');
const streamOptions = {seek: 0, volume: 1};
require('ffmpeg');

module.exports.run = async (client, message, args, serverQueue, queue) => {
    if (!message.member.voice.channel){
        return message.channel.send("You have to be in a voice channel to stop the music!");
    }
        
    if (!serverQueue){
        return message.channel.send("There is no song that I could skip!");
        
    }
    serverQueue.connection.dispatcher.end();
}