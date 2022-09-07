import Discord from 'discord.js';

export async function run(client, message, args) {
    message.channel.send('Scrapyard Quests', {
        files: [
            "./Image/scrapyard.png"
        ]
    });
}