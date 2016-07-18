  var helper = require('sendgrid').mail

  from_email = new helper.Email("eliasdsdf@gmail.com")
  
  to_email = new helper.Email("elias.mikkola1@gmail.com")
  
  subject = "Registrationshit"
  
  content = new helper.Content("text/plain", "some text here");
  
  mail = new helper.Mail(from_email, subject, to_email, content);
  
  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
  
  var requestBody = mail.toJSON()
  
  var request = sg.emptyRequest()
  
  request.method = 'POST'
  
  request.path = '/v3/mail/send'
  
  request.body = requestBody
  
  sg.API(request, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  });



  //IiQZVjzXSfmR2fYpuYdzDQ


// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env