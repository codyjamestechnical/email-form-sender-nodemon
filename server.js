var express = 		require('express');
	path = 			require('path');
	nodeMailer = 	require('nodemailer');
	bodyParser = 	require('body-parser');

var app = express();
var port = 3001;

app.listen(port, (rec, res) => {
	console.log('Server is running on port: ', port);
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
	let transporter = nodeMailer.createTransport({
		host: '',
		port: 465,
		secure: true,
		auth: {
			user: '',
			pass: ''
		}
	})

	let mailOptions = {
		from: '"some name" <xx@someemail.com>',
		to: "email@test.com || req.body.to",
		subject: req.body.subject,
		text: req.body.body
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.statusMessage = "Error sending message";
    		res.status(500).end();
			return console.log(error);
		}

		console.log('Message %s sent: %s', info.messageId, infor.response);
		res.statusMessage = "Message sent"
		res.status(200).end();
	})
})