// Mostly copied from https://github.com/gsuitedevs/node-samples/blob/master/gmail/quickstart/index.js
// Manually Promissified
/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START gmail_quickstart]
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];

const TOKEN_PATH = path.resolve(process.env.PROJECT_ROOT, './secret', 'token.json');
const CREDENTIAL_PATH = path.resolve(process.env.PROJECT_ROOT, './secret', 'credentials.json');

// Load client secrets from a local file.
const getAuthClient = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(CREDENTIAL_PATH, (err, content) => {
            if (err) {
                console.error('Error loading client secret file:', err);
                reject(err);
            }
            // Authorize a client with credentials, then call the Gmail API.
            authorize(JSON.parse(content)).then((authClient) => {
                resolve(authClient);
            }).catch(err => reject(err));
        });
    });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
const authorize = (credentials) => {
    return new Promise((resolve, reject) => {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                getNewToken(oAuth2Client).then((newClient) => {
                    resolve(newClient);
                }).catch(e => reject(e));
            } else {
                oAuth2Client.setCredentials(JSON.parse(token));
                resolve(oAuth2Client);
            }
        });
    });
};



/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getNewToken = (oAuth2Client) => {
    return new Promise((resolve, reject) => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    console.error('Error retrieving access token', err);
                    reject(err);
                }
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                resolve(oAuth2Client);
            });
        });
    });
};

module.exports = {
    getAuthClient
};
// [END gmail_quickstart]