require('dotenv/config');
const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports.loginSpreadSheet = async function () {
    try{
        const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEED_ID);
    
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        });
        
        await doc.loadInfo();

        return doc;
    }
    catch(err){
        throw err;
    }
}

module.exports.authenticateUser = async function (userId, sheet) {
    try{
        let sheetRows = await sheet.getRows();
        for(let i = 0; i < sheetRows.length; i++){
            if(sheetRows[i].ID === userId){
                return true;
            }
        }
        return false;
    }
    catch(err){
        throw err;
    }
}