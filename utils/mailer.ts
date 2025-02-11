import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { envVariables } from '@/config/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: envVariables.productionEmail,
        pass: envVariables.productionEmailPassword
    }
})

export const sendEmailThroughNodemailer = async (token: string, email: string, name: string) => {
    const response = await transporter.sendMail({
        from: envVariables.productionEmail,
        to: email,
        subject: 'Verification Email',
        text: 'Verify your Account',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify account</title>
            </head>
            <body>
                <div 
                    style="margin: 5px; padding: 5px; width: 98%; height: 100%; border: solid rgb(218, 212, 212) 1px; border-radius: 5px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"
                >
                    <p style="padding: 0px 50px;">
                        Dear ${name.split(' ')[0]},
                    </p>
                    <p style="padding: 0px 100px">
                        Thank you for choosing <strong>Ecomstore</strong>. Please confirm that you want to use <strong style="text-decoration: underline; color: rgb(3, 139, 176);">${email}</strong> as your <strong>Ecomstore account</strong> email address. Once it's done you will be able to access your account.
                    </p>
                    <div 
                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 10px; padding: 0px 100px;"
                    >
                        <a 
                            href="${envVariables.domainName}/auth/verify-account?key=${token}" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style="background-color: rgb(13, 186, 30); color: white; padding: 15px; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; text-align: center; width: 100%; font-weight: bold; font-size: large;"
                        >
                            Verify my Email
                        </a>
                    </div>
                </div>
            </body>
            </html>
        `
    })

    return response as SMTPTransport.SentMessageInfo;
}