var dotenv = require('dotenv').config();

  var helper = require('sendgrid').mail

  from_email = new helper.Email("aleksi.hamalainen@aaltoes.com")
  
  to_email2 = new helper.Email("eliasdsdf@gmail.com");
  to_email1 = new helper.Email("elias.mikkola1@gmail.com");
  
  to_email = [to_email1, to_email2];

  subject = "Registrationshit shit 2"
  
  content = new helper.Content("text/plain", "some text here");
  
  mail = new helper.Mail(from_email, subject, to_email1, content);
  
  var pers = new helper.Personalization()

  pers.addTo(to_email2)
  mail.addPersonalization(pers)

  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
  
  var requestBody = mail.toJSON()
  console.log("rb")
  console.log(requestBody);
  
  var request = sg.emptyRequest()
  
  request.method = 'POST'
  
  request.path = '/v3/mail/send'
  
  request.body = requestBody
  
  sg.API(request, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  });



  // personalizations:
  //  [ Personalization {
  //      tos: [Object],
  //      ccs: undefined,
  //      bccs: undefined,
  //      subject: undefined,
  //      headers: undefined,
  //      substitutions: undefined,
  //      custom_args: undefined,
  //      send_at: undefined,
  //      addTo: [Function],
  //      getTos: [Function],
  //      addCc: [Function],
  //      getCcs: [Function],
  //      addBcc: [Function],
  //      getBccs: [Function],
  //      setSubject: [Function],
  //      getSubject: [Function],
  //      addHeader: [Function],
  //      getHeaders: [Function],
  //      addSubstitution: [Function],
  //      getSubstitutions: [Function],
  //      addCustomArg: [Function],
  //      getCustomArgs: [Function],
  //      setSendAt: [Function],
  //      getSendAt: [Function],
  //      toJSON: [Function] } ],
  // subject: 'Registrationshit',
  // content: [ { type: 'text/plain', value: 'some text here' } ],
  // attachments: undefined,
  // template_id: undefined,
  // sections: undefined,
  // headers: undefined,
  // categories: undefined,
  // custom_args: undefined,
  // send_at: undefined,
  // batch_id: undefined,
  // asm: undefined,
  // ip_pool_name: undefined,
  // mail_settings: undefined,
  // tracking_settings: undefined,
  // reply_to: undefined }



