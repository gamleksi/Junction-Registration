  // var helper = require('sendgrid').mail

  // from_email = new helper.Email("hackjunction@aaltoes.com")

  // to_email = new helper.Email("aleksijonathanhamalainen@gmail.com")

  // subject = "Registrationshit"

  // content = new helper.Content("text/plain", "some text here");

  // mail = new helper.Mail(from_email, subject, to_email, content);

  // var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);

  // var requestBody = mail.toJSON()

  // var request = sg.emptyRequest()

  // request.method = 'POST'

  // request.path = '/v3/mail/send'

  // request.body = requestBody

  // sg.API(request, function (response) {
  //   console.log(response.statusCode)
  //   console.log(response.body)
  //   console.log(response.headers)
  // });

var dotenv = require('dotenv').config();
var sendgrid = require('./sendgrid/sendgrid.js')

sendgrid.sendRegisterConfirmation("elias.mikkola1@gmail.com", "Aleksi");