  var EventEmitter = require('events');
  var event = new EventEmitter();
  var helper = require('sendgrid').mail;

  var from_email = new helper.Email(process.env.EMAIL_FROM)  
  
  var approvalMail = {
    content: new helper.Content("text/plain", "some text here"),  
    subject: "Registrationshit",
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
    
      event.on('newMailSent', function(statusCode) {
        callback(statusCode);
      });

      var to_email = new helper.Email(emails[0])
                
      mail = new helper.Mail(from_email, approvalMail.subject, to_email, approvalMail.content);      

      emails.shift()

      for(var i in emails) {

        to_email = new helper.Email(emails[i]);  
        var personalization = new helper.Personalization();
        personalization.addTo(to_email);
        mail.addPersonalization(personalization);
     
      }
      var requestBody = mail.toJSON()
      console.log("request body")
      console.log(requestBody);
      
      var request = createNewRequest(requestBody);
      
      sg.API(request, function (response) {
        console.log("Mail")
        console.log(response.statusCode)
        console.log(response.body)
        // console.log(response.headers)
        //TODO pitääkö statusCode jo tässä vaiheessa tsekata
        event.emit('emailsSent', response.statusCode);
      });
      
      }
  };