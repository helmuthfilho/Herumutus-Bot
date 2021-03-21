require('dotenv/config');
const Discord = require('discord.js');
const ExceptionHandler = require('../Helpers/exception_handler.js');
const GoogleSpreadsheetHelper = require('../Helpers/google_spreadsheet_helper.js');
const MessageEmbedHelper = require('../Helpers/message_embed_helper.js');

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
            MessageEmbedHelper.sendSucessEmbed(embed, message, `A criação da planilha "${sheetTitle}" ocorreu com sucesso 😄`);
            return;
        }

        MessageEmbedHelper.sendErrorEmbed(embed, message, `🤬 Algo de errado aconteceu ao tentar criar a planilha "${sheetTitle}". Verifique os logs!!! 🤬`);
    }
    catch(err){
        ExceptionHandler.replyExceptionMessage(message, err);
    }
}