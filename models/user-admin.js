var bcrypt = require('bcryptjs');
var orm = require('orm');
var dateFormat = require('dateformat');
var EventEmitter = require('events');
var event = new EventEmitter();
var formValues = require('../FORM_VALUES.js')

module.exports = {
	createModel: function(db) {
		// Form attributes:
		// - age: Int [CHECK]
		// - firstname: String [CHECK]
		// - lastname: String [CHECK]
		// - country: String (määrämuotoinen) [CHECK]
		// - email: String (määrämuotoinen) [CHECK]
		// - gender [male, female, other] [CHECK]
		// - t-shirt size: [xs, s, m, l, xl, xxl] [CHECK]
		// - dietary restrictions: String (määräpituus, esim 160 merkkiä) 
		/*	Vegetarian:
		 	No Pork:
	 		Gluten-Free:
		   	No special restrictions: */

		// - top track choice (checkbox trackeistä, 1 valinta)
		// - portfolio: String (url)
		// - question 1: String
		// - question 2: String
		// - comments for organizers

var validate = function(strng) {
		console.log(formValues);
			var valueArray = formValues[strng];
			var result = [];
			for(var i in valueArray) {
				result.push(valueArray[i].value);
			}
			return result;
		}

		var tracks = validate("track");
		var shirtsizes = validate("shirtsize");
		var occupation = validate("occupation");
		var	dietarys = validate("dietary");
		var sexes =validate("sex");
		var role = validate('role');
		var skills = validate('skills');
		var operating = validate('operating');
		var experiences = validate('experience');
		var sublime = validate('sublime');

		var travels = ["Fin", "No", "Nord", "Eu", "Out"];
		var statuses = ["accept","reject","pending"];
		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				age: {type: 'integer'},
				email: {type:"text", key: true},
				countryFrom: String,
				city: String,
				countryHome: String,
				sex: String,
				shirtsize: String,
				dietary: String,
				track: String,
				portfolio:String,
				question1:String,
				question2:String,
				comment:String,
				password: {type: "text", defaultValue: "participant"},
				skills: String,
				role:String,
				occupation:String,
				secret:String,
				team:String,
				operating: String,
				sublime: String,
				admin: {type: "boolean", defaultValue: false},
				accepted:  {type: "boolean", defaultValue: false},
				refused:  {type: "boolean", defaultValue: false},
				batch: Date,
				invitationHash: String,
				refuseHash: String,
				status: {type: "text", defaultValue: "pending"},
				travelReimbursement: {type: "text", defaultValue: undefined},				
				invitationEmailStatus: {type: "text", defaultValue: "Not Send"},
				registerEmailStatus: {type: "text", defaultValue: "Should be sent??"}
			}, {

				validations: {
					email: orm.enforce.unique("email taken!"),
				    sex: orm.validators.insideList(sexes, "Invalid sex"),
				    travelReimbursement: orm.validators.insideList(travels, "Invalid travel reimbursement"),
				    shirtsize: orm.validators.insideList(shirtsizes, "Invalid shirtsize"),
				    track: orm.validators.insideList(tracks, "Invalid track"),
				    dietary: orm.validators.insideList(dietarys, "Invalid dietary"),
				    status: orm.validators.insideList(statuses, "Invalid status"),
				    role: orm.validators.insideList(role, "Invalid role"),
				    occupation: orm.validators.insideList(occupation, "Invalid occupation"),
				    skills: orm.validators.insideList(skills, "Invalid skill"),
				    operating: orm.validators.insideList(operating, "Invalid operating"),
				    experience: orm.validators.insideList(experiences, "Invalid experiences"),
				    sublime: orm.validators.insideList(sublime, "Invalid sublime answer"),
				},
				methods:{
					getPassword:function(){
						return this.password;
					}
				}
			}
		);
		Users.createAdmin = function(user, callback){
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(user.password, salt, function(err, hash) {
					user["password"] = hash;
					Users.create(user, function(err,items){
						if(err){
							console.error(err);
							callback(false)
						} else {
							console.log("User has been created succesfully.")
							callback(true)
						}
					});					
				});
			});
		};
		return Users
	}
};	



