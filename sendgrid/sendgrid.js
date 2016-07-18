  var EventEmitter = require('events');
  var event = new EventEmitter();
  var helper = require('sendgrid').mail

  var from_email = new helper.Email("aleksi.hamalainen@aaltoes.com")  
  
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
  }

  var sendEmail = function(to_email, subject, content) {
    mail = new helper.Mail(from_email, subject, to_email, content);
    var requestBody = mail.toJSON()
    var request = createNewRequest(requestBody)
    sg.API(request, function (response) {
      console.log("Mail")
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
      //TODO pitääkö statusCode jo tässä vaiheessa tsekata
      event.emit('newMailSent', to_email, response.statusCode);
    });
  }  

  module.exports = {
    sendApprovalMails: function(emails, callback) {
      var userStatusCodes = {};
      console.log("emails");
      console.log(emails);
      event.on('newMailSent', function(email, statusCode) {
        userStatusCodes[email] = statusCode;
        if(Object.keys(userStatusCodes).length === emails.length) {
          console.log("mailit lähetetty");
          callback();
        }
        
      });

      for(i in emails) {
        sendEmail(emails[i], approvalMail.subject, approvalMail.content);
      }
    }
  };



/**

Moikka Aleksi!

Mainiota, Wanha Satama on myös tosi kiva mesta. :)

Meillä näyttää tilanne melko hyvältä, on suht vahva kattaus yhteistyötahoja jo mukana (alustava lupaus jo Konecranes, Wärtsilä, Rolls Royce, Napa, Helsingin kaupunki ja satama, Trafi, Tulli). Iso haaste on vain kustannukset, jotka tuntuu monelle kovalta. Onko tuo 50k fiksattu, vai onko siinä yhtään joustoa? Tuntuu että monet tahot antaisi mieluummin omia resujaan ja tilojaan käyttöön, mutta pyritään perustelemaan että laatu maksaa. :)

Pete
**/