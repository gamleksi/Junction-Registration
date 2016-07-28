module.exports = {
		sex: [	{"value":"male","text":" Male"},
		 			{"value":"female","text":" Female"},
		 			{"value":"other","text":" Other"}
		 ],
		shirtsize: [
					{"value":"xs","text":" XS"},
		 			{"value":"s","text":" S"},
		 			{"value":"m","text":" M"},
		 			{"value":"l","text":" L"},
		 			{"value":"xl","text":" XL"},
					{"value":"xxl","text":" XXL"}

		],
		dietary: [
					{"value":"no","text":" No special restricitons"},
		 			{"value":"veg","text":" Vegan"},
		 			{"value":"glut","text":" Gluten free"},
		 			{"value":"pork","text":" No pork"}
		],
		track: [
					{"value":"junction","text":" Junction"},
		 			{"value":"other","text":" Other"},
		],
		tabObject: [
		    {
		        tabValue: "Hackers",
		        visible: true
		    },{
		        tabValue: "Selected",
		        buttonValue: "Invite",
		        visible: false
		    },{
		        tabValue: "Previous",
		        buttonValue: "Reload",
		        visible: false
		    }
		],
		notBeShownInOpeningRow: ["email", "country"],
		attrNotBeShownInRows: ["question1", "question2", "comment"],
		attrNotBeShown: ["admin", "password"]
};