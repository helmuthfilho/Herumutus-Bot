import 'dotenv/config';
import { MessageEmbed } from 'discord.js';
import { replyExceptionMessage } from '../Helpers/exception_handler.js';
import { loginSpreadSheet } from '../Helpers/google_spreadsheet_helper.js';
import { sendSucessEmbed, sendErrorEmbed } from '../Helpers/message_embed_helper.js';

export async function run(client, message, args) {
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

        const spreadSheet = await loginSpreadSheet();

        let userAuthenticationSheet = spreadSheet.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        let rowsBeforeInsert = await userAuthenticationSheet.getRows();

        let rowsCountBeforeInsert = rowsBeforeInsert.length;

        let insertedRow = await userAuthenticationSheet.addRow({ID: args[0], Username: args[1]});

        //Minus one because the row index considers the header of the sheet as a row, while .getRows() don't
        let rowsCountAfterInsert = insertedRow.rowIndex - 1;

        const embed = new MessageEmbed();

        if(rowsCountAfterInsert > rowsCountBeforeInsert){
            sendSucessEmbed(embed, message, `O insert do usuário "${args[0]}" ocorreu com sucesso 😄`)
            return;
        }

        sendErrorEmbed(embed, message, `🤬 Algo de errado aconteceu ao tentar inserir o usuário "${args[0]}". Verifique os logs!!! 🤬`);
    }
    catch(err){
        replyExceptionMessage(message, err);
    }
}