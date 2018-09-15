const { getAuthClient } = require('./google');
const MailComposer = require('nodemailer/lib/mail-composer');
const {google} = require('googleapis');

const send = (from, to, subject, text, options = []) => {
    return new Promise(async (resolve, reject) => {
        let auth;
        try {
            auth = await getAuthClient();
        } catch (e) {
            reject(e);
        }

        const mail = new MailComposer({
            to,
            from,
            subject,
            text,
            ...options
        });
        mail.compile().build((err, message) => {
            if (err) {
                console.error('The API returned an error: ' + err);
                reject(err);
            }

            const gmail = google.gmail('v1');
            gmail.users.messages.send({
                auth: auth,
                userId: 'me',
                resource: {
                    // base64url encoding
                    raw: message.toString('base64').replace(/\//g,'_').replace(/\+/g,'-')
                }
            }, (err, response) => {
                if (err) {
                    console.error('The API returned an error: ' + err);
                    reject(err);
                }
                resolve(response);
            });
        });
    });
};

module.exports = {
    send
};