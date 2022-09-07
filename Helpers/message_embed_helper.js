import Discord from 'discord.js';

export async function sendSucessEmbed(embed, message, description, ){
    embed.setColor('#00FF00')
    .setTitle('Sucesso!')
    .setURL('')
    .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`)
    .setDescription(description)
    .setThumbnail('https://raw.githubusercontent.com/ashwurz/Herumutus-Bot/master/Image/Bot_Icon_Uptade.png')
    .setTimestamp(new Date())
    .setFooter("© Herumutu's BOT Corporation");

    message.channel.send(embed);
}  

export async function sendErrorEmbed (embed, message, description) {
    embed.setColor('#FF0000')
    .setTitle('Erro!')
    .setURL('')
    .setAuthor(`${message.author.username}`,'https://www.iconsdb.com/icons/preview/soylent-red/alert-xxl.png')
    .setDescription(description)
    .setThumbnail('https://raw.githubusercontent.com/ashwurz/Herumutus-Bot/master/Image/sad_man.png')
    .setTimestamp(new Date())
    .setFooter("© Herumutu's BOT Corporation");

    message.channel.send(embed);
}