  var EventEmitter = require('events');
  var event = new EventEmitter();
  var helper = require('sendgrid').mail;
  var travelValues= require("../TRAVEL_VALUES.js")
  var from_email = new helper.Email(process.env.EMAIL_FROM)  
  
  var approvalMail = {
    content: new helper.Content("text/html", "<div></div>")  
  };

  var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

  var createNewRequest = function(requestBody) {
      var request = sg.emptyRequest()
      request.method = 'POST'
      request.path = '/v3/mail/send'
      request.body = requestBody
      return request;
  };

  module.exports = {


    sendApprovalMails: function(emailObjects, callback) {
      console.log("SEND APPROVALMAILS")
      event.on('newMailSent', function(responseObject) {
        console.log("EMITTED")
        callback(responseObject);
      });

      var emails = Object.keys(emailObjects);
      console.log("emails")
      console.log(emails)
      var to_email = new helper.Email(emails[0])

      mail = new helper.Mail(from_email, "You have been accepted to Junction", to_email, approvalMail.content);  
      mail.personalizations[0].addSubstitution({"%email%":emails[0]})
      mail.personalizations[0].addSubstitution({"%first_name%": emailObjects[emails[0]].firsname}) 
      mail.personalizations[0].addSubstitution({"%travel%":travelValues.message(emailObjects[emails[0]].travelReimbursement)})
      
      var reverseHash = emailObjects[emails[0]].hash.split("").reverse().join("");
      
      mail.personalizations[0].addSubstitution({"%name%":emailObjects[emails[0]].firstname}) 
      
      var confirmLink= process.env.DOMAIN_ADDRESS + "/confirm/accept/" + reverseHash;
      var decideLink= process.env.DOMAIN_ADDRESS + "/confirm/decide/" + reverseHash;

      mail.personalizations[0].addSubstitution({"%confirm_link%": confirmLink}) 
      mail.personalizations[0].addSubstitution({"%reject_link%": decideLink}) 
 

      sg.emptyRequest();


      for(var i in emails) {
        if(i > 0){
          to_email = new helper.Email(emails[i]);  
          var personalization = new helper.Personalization();
          var reverseHash = emailObjects[emails[i]].hash.split("").reverse().join("");

          personalization.addTo(to_email);
          personalization.addSubstitution({"%email%":emails[i]})
          personalization.addSubstitution({"%travel%":travelValues.message(emailObjects[emails[i]].travelReimbursement)}) 
          personalization.addSubstitution({"%first_name%":emailObjects[emails[i]].firstname}) 
          personalization.addSubstitution({"%hash%":reverseHash}) 
          mail.addPersonalization(personalization);
        }
      }
      var requestBody = mail.toJSON()
      requestBody.template_id = process.env.SENDGRID_INVITATION_FUCK_ID;
      console.log("request body")
      console.log(requestBody);
          
      var request = createNewRequest(requestBody);
      
      sg.API(request, function (response) {
        console.log("Mail")
        console.log(response.statusCode)
        console.log("BODY FROM SendGrid")
        console.log(response.body)
        console.log(response.headers)
        event.emit('newMailSent', response.statusCode);
      });
      
      },
      
      sendRegisterConfirmation: function(email, firstname){
        var to_email = new helper.Email(email);
        var mail = new helper.Mail(from_email, "Junction registeration", to_email, approvalMail.content);  
        mail.personalizations[0].addSubstitution({"%email%":email});
        mail.personalizations[0].addSubstitution({"%first_name%": firstname});  
        sg.emptyRequest();
        console.log("mail.personalizations[0]")
        console.log(mail.personalizations[0])

        var requestBody = mail.toJSON();
        requestBody.template_id = process.env.SENDGRID_CONFIRMATION_FUCK_ID;  
        var request = createNewRequest(requestBody);
        
        sg.API(request, function (response) {
          console.log("Mail");
          console.log(response.statusCode);
          console.log("BODY FROM SendGrid");
          console.log(response.body)
        });
      }

  };