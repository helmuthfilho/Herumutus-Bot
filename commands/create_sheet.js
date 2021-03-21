require('dotenv/config');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const Discord = require('discord.js');
const ExceptionHandler = require('../Helpers/exception_handler.js');
const GoogleSpreadsheetHelper = require('../Helpers/google_spreadsheet_helper.js');

module.exports.run = async (client, message, args) => {
    try{
        if(args.length < 2){
            message.reply("Para usar este comando são necessários no mínimo 2 argumentos:\n" +
                          "h!create_sheet [1] [2] [3] ...\n" +
                          "Sendo [1]: o título da planilha e [2], [3] ...: os headers da planilha");
            return;
        }

        let authorId = message.author.id;
        let spreadSheet = await GoogleSpreadsheetHelper.loginSpreadSheet();
        
        let userAuthenticationSheet = spreadSheet.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        if(!await GoogleSpreadsheetHelper.authenticateUser(authorId, userAuthenticationSheet)){
            message.reply("Seu usuário não é autenticado para poder utilizar este comando.");
            return;
        }

        let sheetTitle = args[0];
        let sheetHeaders = [];
        
        for(let i = 1; i < args.length; i++){
            sheetHeaders.push(args[i]);
        }

        let newSheet = await spreadSheet.addSheet({title: sheetTitle, headerValues: sheetHeaders});

        const embed = new Discord.MessageEmbed();

        if(newSheet != undefined || newSheet != null){
            embed.setColor('#00FF00')
            .setTitle('Sucesso!')
            .setURL('')
            .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`)
            .setDescription(`O insert do usuário "${args[0]}" ocorreu com sucesso 😄`)
            .setThumbnail('https://raw.githubusercontent.com/ashwurz/Herumutus-Bot/master/Image/Bot_Icon_Uptade.png')
            .setTimestamp(new Date())
            .setFooter("© Herumutu's BOT Corporation");

            message.channel.send(embed);
            return;
        }

        embed.setColor('#FF0000')
        .setTitle('Erro!')
        .setURL('')
        .setAuthor(`${message.author.username}`,'https://www.iconsdb.com/icons/preview/soylent-red/alert-xxl.png')
        .setDescription(`🤬 Algo de errado aconteceu ao tentar inserir o usuário "${args[0]}". Verifique os logs!!! 🤬`)
        .setThumbnail('https://raw.githubusercontent.com/ashwurz/Herumutus-Bot/master/Image/sad_man.png')
        .setTimestamp(new Date())
        .setFooter("© Herumutu's BOT Corporation");

        message.channel.send(embed);
    }
    catch(err){
        ExceptionHandler.replyExceptionMessage(message, err);
    }
}