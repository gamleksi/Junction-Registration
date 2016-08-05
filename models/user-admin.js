var bcrypt = require('bcryptjs');
var orm = require('orm');
var dateFormat = require('dateformat');
var EventEmitter = require('events');
var event = new EventEmitter();

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

		var shirtsizes = ["xs","s","m","l","xl","xxl"];
		var	dietarys = ["no","veg","pork","glut"];
		var tracks = ["junction","other"];
		var sexes =["male", "female","other"];
		var travels = ["Fin", "No", "Nord", "Eu", "Out"]
		var statuses = ["accept","reject","pending"];
		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				age: {type: 'integer'},
				email: {type:"text", key: true},
				country: String,
				sex: String,
				shirtsize: String,
				dietary: String,
				track: String,
				portfolio:String,
				question1:String,
				question2:String,
				comment:String,
				password: {type: "text", defaultValue: "participant"},
				skills:String,
				role:String,
				secret:String,
				team:String,
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



