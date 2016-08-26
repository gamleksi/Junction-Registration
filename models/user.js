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
			var valueArray = formValues[strng];
			var result = [];
			for(var i in valueArray) {
			
				result.push(valueArray[i].value);
			}
			return result;
		}

		var tracks = validate("track");
		var shirtsizes = validate("shirtsize");
		var occupationArr = validate("occupation");
		var	dietarys = validate("dietary");
		var sexes =validate("sex");
		var roleArr = validate('role');
		var skillsArr = validate('skills');
		var operatingArr = validate('operating');
		var experiences = validate('experience');
		var sublimeArr = validate('sublime');
		var travels = ["Fin", "No", "Nord", "Eu", "Out"];
		var statuses = ["accept","reject","pending"];

		var Users = db.define("users", {
				firstname: String,
				lastname: String,
				age: {type: 'integer'},
				email: {type:"text", key: true},
				phone: String,
				countryFrom: String,
				city: String,
				countryHome: String,
				sex: String,
				shirtsize: String,
				dietary: String,
				track: String,
				portfolio:String,
				motivation:String,
				experience:String,
				comment:String,
				password: {type: "text", defaultValue: "participant"},
				skills: String,
				role:String,
				school:{type: "text", defaultValue: undefined},
				occupation:String,
				secret:String,
				team:String,
				operating: String,
				sublime: String,
				admin: {type: "boolean", defaultValue: false},
				accepted:  {type: "boolean", defaultValue: false},
				refused:  {type: "boolean", defaultValue: false},
				registrationDate: Date,
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
				    role: orm.validators.insideList(roleArr, "Invalid role"),
				    occupation: orm.validators.insideList(occupationArr, "Invalid occupation"),
				    operating: orm.validators.insideList(operatingArr, "Invalid operating"),
				    experience: orm.validators.insideList(experiences, "Invalid experiences"),
				    sublime: orm.validators.insideList(sublimeArr, "Invalid sublime answer"),
				},
				methods:{
					getPassword:function(){
						return this.password;
					}
				}
			}
		);

		Users.createUser = function(user, callback){
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(user.password, salt, function(err, hash) {
					user["password"] = hash;
					var date = new Date()
					user["admin"] = false;
					Users.create(user, function(err,items){
				      if(err){
				      	console.log("ERROR IN USER CREATE")
				       	console.error(err);
				       callback({"error":err})
				      } else {
				       console.log("User has been created succesfully.")
				       callback({success:true})
				      }
				     });		
				});
			});
		};

		Users.getUserByEmail = function(addr, callback){
			Users.one({"email":addr}, function(err,user){
				if(err) throw err;
				else callback(user);
			});
		};


		Users.acceptHackers = function(hackers, callback) {

			console.log("USERS IN ACCEPTHACKERS")


			var date = dateFormat(new Date(), "isoDate");
			var errors = 0; 
			var savedUsers = [];

			event.once('event', function(){
				console.log(savedUsers);
				callback(savedUsers);
			});

			function inner(hacker) {
				Users.one({"email": hacker.email}, function(err, user) {
					
					if(err) {
						errors++;
						throw err;
					} 
					if(user) {
						var date = dateFormat(new Date(), "isoDate").split("T")[0];
						user.accepted = true;
						user.batch = date;
						user.travelReimbursement = hacker.travelReimbursement;
						user.save(function(err) {
							if(err) {
								errors++;
								throw err;
							} else {
								savedUsers.push(user);
							}
							var length = errors + savedUsers.length
							if(Object.keys(hackers).length === (length)) {
								event.emit('event');
							}
						});							

					}

				});				
			} 
			
			for(var key in hackers){
				inner(hackers[key]);
			}
		};

		Users.addWebhookInformation = function(email, event) {

			Users.one({"email":email}, function(err,user){
				if(err) throw err;
				if(user) {
					if(user.travelReimbursement) {
						user.invitationEmailStatus = event;
						
					} else {
						user.registerEmailStatus = event;
					}
					user.save();
				}
			});
		}; 
			

		Users.comparePasswords = function(candidatePassword, hash, callback){
			bcrypt.compare(candidatePassword,hash, function(err, isMatch){
				if(err) console.error("error in compare pass" + err);
				callback(null,isMatch);
			});
		};

		Users.changeStatusWithHash = function(status,hash,callback){
      		var reverseHash = hash.split("").reverse().join("");

			Users.one({"invitationHash":reverseHash}, function(err,user){
				if(err){
					callback("status not changed")
					throw err;
				} 
				if(user) {
					user.status = status;
					user.save();
					callback(true)
				}else {
					callback(false)

				}
			});
		};

		Users.refuseHashMatches = function(hashString,callback) {
      		var reverseHash = hashString.split("").reverse().join("");
			Users.one({"refuseHash": reverseHash}, function(err,user){
				if(err){
					callback("status not changed")
					throw err;
				} 
				if(user) {
					callback(user.email);
				}else {
					callback(undefined);
				}
			});
		};

		Users.refuseHacker = function(email) {

			Users.one({"email": email}, function(err,user) {
				if(err) {
					throw err;
				}

				if(user) {
					user.refused = true;
					user.save();
				}
			});
		};
			

		Users.invitationHashMatches = function(hashString,callback){

      		var reverseHash = hashString.split("").reverse().join("");
			Users.exists({"invitationHash":reverseHash}, function(err,exists){
				if(err){
					callback("status not changed")
					throw err;
				} 
				if(exists) {
					callback(true);
				}else {
					callback(false);
				}
			});
		};

		Users.getUsers = function(callback){
			Users.find({admin: false, refused: false}).omit('admin').omit('password').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};

		Users.getUsersWithParameters = function(params,callback){
			params.admin = false;
			if(params.refused === undefined) {
				params.refused = finalse;
			}
			Users.find(params).omit('admin').omit('password').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};

		Users.getAcceptedUsers = function(callback){
			Users.find({admin: false, refused: false, accepted:  true}).omit('admin').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};
		
		Users.masterSearch = function(params, callback) {
			var filterShow = {};
			if(params.filterShow) {
			 filterShow = params.filterShow;
			 if(params.refused) {
			 	 filterShow["refused"] = true;
			 } else {
			 	filterShow["refused"] = false;
			 }
			}
			// for(var key in params.filterOff) {
			// 	filterShow[key] = {"less than": params.filterOff[key]};
			// }
			console.log(params)
			var order = params.sortBy;
			console.log("oder+++ " + order)
			Users.find(filterShow, order).omit('admin').run(function(err, results) {
				if(err) {
					throw err;
				}
				callback(results);
			});
		};	
			
			return Users;
		}
};