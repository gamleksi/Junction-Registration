  var EventEmitter = require('events');
  var event = new EventEmitter();
  var helper = require('sendgrid').mail;
  var travelValues= require("../TRAVEL_VALUES.js")
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
    sendApprovalMails: function(emailObjects, callback) {
      console.log("SEND APPROVALMAILS")
      event.on('newMailSent', function(responseObject) {
        console.log("EMITTED")
        callback(responseObject);
      });

      var emails = Object.keys(emailObjects);

      var to_email = new helper.Email(emails[0])

      mail = new helper.Mail(from_email, "You have been accepted to Junction", to_email, approvalMail.content);  
      mail.personalizations[0].addSubstitution({"-mail-":emails[0]}) 
      mail.personalizations[0].addSubstitution({"-travel-":travelValues.message(emailObjects[emails[0]].travelReimbursement)})
      
      var reverseHash = emailObjects[emails[0]].hash.split("").reverse().join("");
      
      mail.personalizations[0].addSubstitution({"-name-":emailObjects[emails[0]].firstname}) 
      mail.personalizations[0].addSubstitution({"-hash-":reverseHash}) 
 

      sg.emptyRequest();


      for(var i in emails) {
        if(i > 0){
          to_email = new helper.Email(emails[i]);  
          var personalization = new helper.Personalization();
          var reverseHash = emailObjects[emails[i]].hash.split("").reverse().join("");

          personalization.addTo(to_email);
          personalization.addSubstitution({"-mail-":emails[i]})
          personalization.addSubstitution({"-travel-":travelValues.message(emailObjects[emails[i]].travelReimbursement)}) 
          personalization.addSubstitution({"-name-":emailObjects[emails[i]].firstname}) 
          personalization.addSubstitution({"-hash-":reverseHash}) 
          


          mail.addPersonalization(personalization);
        }
      }
      var requestBody = mail.toJSON()
      requestBody.template_id = process.env.SENDGRID_ACCEPTED_TEMPLATE_ID
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
      
      },
      sendRegisterConfirmation: function(email){
        var to_email = new helper.Email(email)
        var mail = new helper.Mail(from_email, "Junction registeration", to_email, approvalMail.content);  
        mail.personalizations[0].addSubstitution({"-mail-":email}) 
        sg.emptyRequest();

      var requestBody = mail.toJSON()
      requestBody.template_id = process.env.SENDGRID_REGISTER_TEMPLATE_ID
      
      
      
      var request = createNewRequest(requestBody);
      
      sg.API(request, function (response) {
        console.log("Mail")
        console.log(response.statusCode)
        console.log("BODY FROM SendGrid")
        //console.log(response.body)
        // console.log(response.headers)
  

      });
      }

  };