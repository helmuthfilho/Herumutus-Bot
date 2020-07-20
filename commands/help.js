const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.channel.send({
    embed: {
      color: 3447003,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Comandos do Herumutu's BOT",
      url: "",
      description: "Essa é uma lista com todos os comandos do Herumutu's BOT.",
      fields: [{
        name: "h!say",
        value: "Faz o bot falar por você"
      },
      {
        name: "h!hyperstats",
        value: "Mostra uma URL com as informações sobre HyperStats do MapleStory"
      },
      {
        name: "h!scrapyard-quests",
        value: "Mostra uma imagem com a relação entre as quests semanais em Scrapyard"
      },
      {
        name: "h!level-guide",
        value: "Mostra uma imagem com os lugares para se upar"
      },
      {
        name: "h!creepy",
        value: "..."
      }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Herumutu's BOT Corporation"
      }
    }
  });
};