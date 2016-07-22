import React from "react";

export default React.createClass({ 
    tabClicked: function() {
    	console.log("toimikkoko")
    	this.props.changeSheet();
    },

    render:function(){
	    var arr = ["active", ""];
	    if(this.props.tabChanged) {
	    	arr[0] = ""
	    	arr[1] = "active"
	    }
		return (	
			<ul class="nav nav-tabs">
			    <li onClick={this.tabClicked} class={arr[0]}><a>Hackers</a></li>
			    <li onClick={this.tabClicked} class={arr[1]}><a>Selected</a></li>
			    <li class="arr[1]"><a>Inivite Selected</a></li>
			</ul>
			) 
	}
})