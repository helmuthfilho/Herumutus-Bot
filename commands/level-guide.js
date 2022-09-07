import Discord from 'discord.js';

export async function run(client, message, args) {
    message.channel.send('Maple Story Level Up Guide', {
        files: [
            "./Image/levels.PNG"
        ]
    });
}