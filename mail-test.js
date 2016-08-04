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

// sendgrid.sendRegisterConfirmation("luukas.castren@gmail.com", "Luge", "1470329083142U2REAW3TYB9");

sendgrid.sendApprovalMails({"luukas.castren@gmail.com": {"email": "luukas.castren@gmail.com", firstname: "Luukasfucker", "invitationHash": "eitoimi", "refuseHash": "3UTU4OHIA4I1470329083142", "travelReimbursement": "Nord"},
    "aleksi.hamalainen@gmail.com": {"email": "aleksi.hamalainen@aaltoes.com", firstname: "Allu", "invitationHash": "eitoimi", "refuseHash": "nakkivene", "travelReimbursement": "Fin"}
}, console.log("onnistui"));