// This file is not in use!

import React from "react";


export default React.createClass({
	findHackers: function() {
		  this.props.findHackers();
	},
	render: function() {
		    return (
		        <button class="select-hackers" onClick={this.findHackers}>Accept hackers</button>
		    )
	}	
})