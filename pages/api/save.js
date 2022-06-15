import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment';

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const generateCoupon = () => {
    const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase();
    return code.substring(0, 4) + '-' + code.substring(4, 8) + '-' + code.substring(8, 12)
}

export default async (request, response) => {
    const request_data = JSON.parse(request.body);
    try {

        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
        })
        await doc.loadInfo()

        const sheetData = doc.sheetsByIndex[0]

        const sheetConfig = doc.sheetsByIndex[1]
        await sheetConfig.loadCells('A2:B3')

        const cellIsValid = sheetConfig.getCell(2, 0)
        const promoMessage = sheetConfig.getCell(2, 1)

        let coupon = ''
        let promo = ''

        if (cellIsValid.value) {
            coupon = generateCoupon()
            promo = promoMessage.value
        }

        const result = await sheetData.addRow({
            name: request_data.name,
            email: request_data.email,
            whatsapp: request_data.whatsapp,
            grade: 5,
            data: moment().format('DD/MM/YYYY HH:mm:ss'),
            coupon: coupon,
            promo: promo,
        })

        response.end(JSON.stringify({
            showCoupon: coupon !== '',
            coupon: coupon,
            promo: promo
        }))
    } catch (err) {
        console.log(err)
        response.end('error')
    }

}