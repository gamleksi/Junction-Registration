  var EventEmitter = require('events');
  var event = new EventEmitter();
  var helper = require('sendgrid').mail;

  var from_email = new helper.Email(process.env.EMAIL_FROM)  
  
  var approvalMail = {
    content: new helper.Content("text/plain", "some text here"),  
    subject: "Registration",
  };
  console.log("sendgrid env");
  console.log(process.env.SENDGRID_API_KEY);


  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)


  var createNewRequest = function(requestBody) {
      var request = sg.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      return request;
  };

  module.exports = {
    sendApprovalMails: function(emails, callback) {
      console.log("SEND APPROVALMAILS")
      event.on('newMailSent', function(responseObject) {
        console.log("EMITTED")
        callback(responseObject);
      });

      var to_email = new helper.Email(emails[0])

      mail = new helper.Mail(from_email, approvalMail.subject, to_email, approvalMail.content);  
      mail.personalizations[0].addSubstitution({"-mail-":emails[0]}) 



      for(var i in emails) {
        if(i > 0){
          to_email = new helper.Email(emails[i]);  
          var personalization = new helper.Personalization();
          personalization.addTo(to_email);
          personalization.addSubstitution({"-mail-":emails[i]})
          mail.addPersonalization(personalization);
        }
      }
      var requestBody = mail.toJSON()
      requestBody.template_id = "7b141e1e-d840-406c-902f-cfd8294e011d"
      console.log("request body")
      console.log(requestBody);
    
      var request = createNewRequest(requestBody);
      
      sg.API(request, function (response) {
        console.log("Mail")
        console.log(response.statusCode)
        console.log("BODY FROM SendGrid")
        //console.log(response.body)
        // console.log(response.headers)
        //TODO pitääkö statusCode jo tässä vaiheessa tsekata
        event.emit('newMailSent', {"statusCode": response.statusCode,
                                    "emails": emails
                                  });


      });
      
      }
  };