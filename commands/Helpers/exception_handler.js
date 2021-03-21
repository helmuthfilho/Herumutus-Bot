module.exports.replyExceptionMessage = function(userMessage, err){
    userMessage.reply(`Deu um erro aqui:\n  ${err}`);
    console.log(err);
}