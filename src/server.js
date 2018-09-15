const restify = require('restify');
require('dotenv').config();
const mail = require('./mail');

const sendEmail = async (req, res, next) => {
    const {from, to, subject, text, options} = req.body;
    console.log(req.body);
    try {
        const result = await mail.send(from, to, subject, text, options);
        // console.log(result);
        res.json({'message': 'success'});
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const server = restify.createServer();
server.post('/sendEmail', sendEmail);
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

server.listen(process.env.SERVER_PORT, () => {
    console.log('%s listening at %s', server.name, server.url);
});