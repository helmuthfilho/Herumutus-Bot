module.exports.replyExceptionMessage = function(userMessage, err, responseMessage = ""){
    console.log(err);
    if(responseMessage !== ""){
        userMessage.reply(responseMessage);
        return;
    }
    userMessage.reply(`Deu um erro aqui:\n  ${err}`);
}