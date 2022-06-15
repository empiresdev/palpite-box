import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (request, response) => {
    console.log(process.env.VAR1)
    try {
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[1]
        await sheet.loadCells('A2:B3')

        const cellIsValid = sheet.getCell(2, 0)
        console.log('cellIsValid=' + cellIsValid.value)

        const promoMessage = sheet.getCell(2, 1)
        console.log('promoMessage=' + promoMessage.value)

        response.end(JSON.stringify({
            showCoupon: cellIsValid.value,
            message: promoMessage.value
        }))
    } catch (err) {
        response.end(JSON.stringify({
            showCoupon: false,
            message: ''
        }))
    }


}