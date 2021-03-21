require('dotenv/config');
const Discord = require('discord.js');
const ExceptionHandler = require('../Helpers/exception_handler.js');
const GoogleSpreadSheetHelper = require('../Helpers/google_spreadsheet_helper.js');
const MessageEmbedHelper = require('../Helpers/message_embed_helper.js');

module.exports.run = async (client, message, args) => {
    try
    {
        if(args.length > 2 || args.length < 2){
            message.reply("Este comando deve ter até dois argumentos!\n" +
            "h!add_user_sheet [1] [2]\n" +
            "Sendo [1]: ID do usuário e [2]: Username do usuário");
            return;
        }

        if(message.author.id !== process.env.DISCORD_MASTER_USER_ID){
            message.reply("Só o meu criador pode utilizar este comando 🤪");
            return;
        }

        const spreadSheet = await GoogleSpreadSheetHelper.loginSpreadSheet();

        let userAuthenticationSheet = spreadSheet.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        let rowsBeforeInsert = await userAuthenticationSheet.getRows();

        let rowsCountBeforeInsert = rowsBeforeInsert.length;

        let insertedRow = await userAuthenticationSheet.addRow({ID: args[0], Username: args[1]});

        //Minus one because the row index considers the header of the sheet as a row, while .getRows() don't
        let rowsCountAfterInsert = insertedRow.rowIndex - 1;

        const embed = new Discord.MessageEmbed();

        if(rowsCountAfterInsert > rowsCountBeforeInsert){
            MessageEmbedHelper.sendSucessEmbed(embed, message, `O insert do usuário "${args[0]}" ocorreu com sucesso 😄`)
            return;
        }

        MessageEmbedHelper.sendErrorEmbed(embed, message, `🤬 Algo de errado aconteceu ao tentar inserir o usuário "${args[0]}". Verifique os logs!!! 🤬`);
    }
    catch(err){
        ExceptionHandler.replyExceptionMessage(message, err);
    }
}