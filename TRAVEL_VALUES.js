var message = function(value){
   var values = {
    "No":0,
    "Fin":20, 
    "Nord":50,
    "Eu": 75, 
    "Out": 150
    }
  var amount = values[value]
  if(amount === 0){
   return "Unfortunately you don't get a travel reimbursement."
  }
  return "You will receive a travel reimbursement of "+amount+" euros."
 }
 

 module.exports = {
  message : message
}