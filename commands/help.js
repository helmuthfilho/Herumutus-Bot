const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.channel.send("h!say - Faz o bot falar por você\nh!hyperstats - Mostra uma URL com as informações sobre HyperStats do MapleStory\nh!scrapyard-quests - Mostra uma imagem com a relação entre as quests semanais em Scrapyard\nh!level-guide - Mostra uma imagem com os lugares para se upar");
};