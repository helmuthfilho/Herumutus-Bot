require('dotenv/config');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const Discord = require('discord.js');

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

        const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEED_ID);
    
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        });
        
        await doc.loadInfo();

        let userAuthenticationSheet = doc.sheetsById[process.env.USER_AUTHENTICATION__SHEET_ID];

        let rowsBeforeInsert = await userAuthenticationSheet.getRows();

        let rowsCountBeforeInsert = rowsBeforeInsert.length;

        let insertedRow = await userAuthenticationSheet.addRow({ID: args[0], Username: args[1]});

        //Minus one because the row index considers the header as a row, while .getRows() don't
        let rowsCountAfterInsert = insertedRow.rowIndex - 1;

        const embed = new Discord.MessageEmbed();

        if(rowsCountAfterInsert > rowsCountBeforeInsert){
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
        message.reply(`Deu um erro aqui:\n  ${err}`);
        console.log(err);
    }
}