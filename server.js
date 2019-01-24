var express = require('express');
path = require('path');
nodeMailer = require('nodemailer');
bodyParser = require('body-parser');
HttpStatus = require('http-status-codes');
stripJS = require('strip-js');
config = require('./config.js');

var app = express();
var port = config.server.port;

app.listen(port, (rec, res) => {
    console.log('Server is running on port: ', port);
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var validateData = (name, email, phone, body) => {
    return new Promise((resolve, reject) => {
        if (!name || !email || !phone || !body) {
            reject()
        } else {
            resolve()
        }
    })
}

app.post('/', (req, res) => {
	let data = req.body
	console.log(JSON.stringify(data))
    validateData(data.name, data.email, data.phone, data.body).then(() => {
        let transporter = nodeMailer.createTransport({
            host: config.mail.server.url,
            port: config.mail.server.port,
            secure: config.mail.server.secure,
            auth: {
                user: config.mail.auth.user,
                pass: config.mail.auth.pass
            }
        })

        let mailOptions = {
            from: `"${data.name}" <${data.email}>`,
            to: config.mail.message.to,
            subject: config.mail.message.subject,
            html: `
			message: <br>
			${stripJS(data.body)}
			<br>
			<br>
			<br>
			Name: ${stripJS(data.name)} <br>
			Phone: ${stripJS(data.phone)} <br>
			Email: ${stripJS(data.email)} <br>
			
		`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.statusMessage = "Message Not Sent: Server Error";
                res.status(500).end();
                return console.log(error);
            }

            console.log(`Message ${info.messageId} sent with info: ${info.response}`);
            res.statusMessage = "Message Sent"
            res.status(200).end();
        })
    }, err => {
        res.statusMessage = "Missing Or Invalid Form Data"
        res.status(400).end()
        return console.log(err)
    })

})