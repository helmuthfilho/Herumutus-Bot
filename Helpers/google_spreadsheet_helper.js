import 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function loginSpreadSheet () {
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

export async function authenticateUser (userId, sheet) {
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