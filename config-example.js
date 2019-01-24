var config = {
	"mail": {
		"server": {},
		"auth": {},
		"message": {}
	},
	"server": {}
}

config.mail.server.url = 'smtp.google.com'
config.mail.server.port = 465
config.mail.server.secure = true

config.mail.auth.user = ''
config.mail.auth.pass = ''

config.mail.message.to_address = 'test@test.com'
config.mail.message.subject = 'Website Form Message'

config.server.port = 3001