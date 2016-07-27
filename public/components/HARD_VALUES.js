import {DOMAIN_ADDRESS}from '../../.env'

module.exports = {
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
		attrNotBeShown: ["admin", "password"],
		domain: DOMAIN_ADDRESS
};