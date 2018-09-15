require('dotenv').config();
const { getAuthClient } = require('./google');

(async () => {
    await getAuthClient();
    console.log('success');
})();

