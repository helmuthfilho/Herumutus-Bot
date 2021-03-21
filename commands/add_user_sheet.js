require('dotenv/config');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    try
    {
        console.log(args);

        if(message.author.id !== process.env.DISCORD_MASTER_USER_ID){
            message.reply("Só o meu criador pode utilizar este comando 🤪");
            return;
        }

        const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEED_ID);
    
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        });
        
        await doc.loadInfo();

        let userAuthenticationSheet = doc.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        await userAuthenticationSheet.addRows({Username: args[0]});

    }
    catch(err){
        message.reply(`Deu um erro aqui:\n  ${err}`);
        console.log(err);
    }
}