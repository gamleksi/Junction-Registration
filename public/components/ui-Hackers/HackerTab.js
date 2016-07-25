import React from "react";
var _ = require('lodash');

export default React.createClass({ 

    defineClass: function(index) {
    	console.log("index")
    	console.log(index)
    	this.props.changeSheet(index)
	},
	renderTabs: function(index){
	    	var tab = this.props.tabObject[index]
			var c=""
			console.log(index);
			if(tab.visible) {
				c = "active"
			}
	    	return (<li key={index} value={index} onClick={() => this.defineClass(index)} class={c}><a>{tab.tabValue}</a></li>)
	},
    render: function(){

	    var tabs = []

	    for(var index in this.props.tabObject) {
	    	tabs.push(this.renderTabs(index))
	    }
		return (	
			<ul class="nav nav-tabs">
				{tabs}
			</ul>
			) 
	}
})