import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(otp: string, email: string, uid: string) {
    const msg = {
        to: email,
        from: 'geekwithtick@gmail.com',
        subject: 'Grocers Bay Email Verification',
        text: `Click the link http://localhost:3002/v1/verify/email/${uid}/${otp} to verify the email`,
        html: `Click the <a href="http://localhost:3002/v1/verify/email/${uid}/${otp}">link</a> to verify email.`,
    };

    try {
        const response = await sgMail.send(msg);
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    } catch (error) {
        console.error(error);
    }
}
