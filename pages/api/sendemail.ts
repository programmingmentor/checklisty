import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req, res) {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const { email, message } = req.body
//     const msg = {
//         // to: 'mariana.panem@gmail.com',
//         to: 'blackdbf@gmail.com',
//         from: 'blackdbf@gmail.com',
//         subject: `New Message From - ${email}`,
//         text: message,
//         html: `<p>${message}</p>`,
//     }

//     try {
//         await sgMail.send(msg)
//         res.status(200).send('Message sent successfully.')
//     } catch (error) {
//         console.log('ERROR', error)
//         res.status(400).send('Message not sent.')
//     }
// }
export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'defaultKey')
    // console.log('req.body', req.body)
    const { email, code } = req.body

    if (!email || !code) {
        res.status(401).json({ error: 'Missing email or code' })
        return
    }

    const msg = {
        to: email,
        from: 'blackdbf@gmail.com',
        subject: 'Recover password',
        text: `Your recovery code is ${code}`,
        // html: `<p>${code}</p>`,
    }

    try {
        await sgMail.send(msg)
        res.status(200).end()
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }
}