import React from "react";
var _ = require('lodash');

export default React.createClass({ 

    defineClass: function(index) {

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
	    var tabButton = []

/*
	    if(this.props.buttonClicked) {
	    	tabs.push(<li class="active tab-button" onClick={this.props.buttonClicked}><a>{this.props.tabButton}</a></li>)
	    }
*/
		return (
			<ul class="nav nav-tabs">
				{tabs}
			</ul>
			) 
	}
})