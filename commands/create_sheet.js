import 'dotenv/config';
import { MessageEmbed } from 'discord.js';
import { replyExceptionMessage } from '../Helpers/exception_handler.js';
import { loginSpreadSheet, authenticateUser } from '../Helpers/google_spreadsheet_helper.js';
import { sendSucessEmbed, sendErrorEmbed } from '../Helpers/message_embed_helper.js';

export async function run(client, message, args) {
    try{
        if(args.length < 2){
            message.reply("Para usar este comando são necessários no mínimo 2 argumentos:\n" +
                          "h!create_sheet [1] [2] [3] ...\n" +
                          "Sendo [1]: o título da planilha e [2], [3] ...: os headers da planilha");
            return;
        }

        let authorId = message.author.id;
        let spreadSheet = await loginSpreadSheet();
        
        let userAuthenticationSheet = spreadSheet.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        if(!await authenticateUser(authorId, userAuthenticationSheet)){
            message.reply("Seu usuário não é autenticado para poder utilizar este comando.");
            return;
        }

        let sheetTitle = args[0];
        let sheetHeaders = [];
        
        for(let i = 1; i < args.length; i++){
            sheetHeaders.push(args[i]);
        }

        let newSheet = await spreadSheet.addSheet({title: sheetTitle, headerValues: sheetHeaders});

        const embed = new MessageEmbed();

        if(newSheet != undefined || newSheet != null){
            sendSucessEmbed(embed, message, `A criação da planilha "${sheetTitle}" ocorreu com sucesso 😄`);
            return;
        }

        sendErrorEmbed(embed, message, `🤬 Algo de errado aconteceu ao tentar criar a planilha "${sheetTitle}". Verifique os logs!!! 🤬`);
    }
    catch(err){
        replyExceptionMessage(message, err);
    }
}