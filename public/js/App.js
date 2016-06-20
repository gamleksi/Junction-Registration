

import React from "react";
import ReactDom from "react-dom";

var SearchButton = React.createClass({
	
	findHackers: function() {
	  this.props.findHackers();
	},
	render: function() {
		return (
			<button onClick={this.findHackers}>Euroopan kovimmat koodarit</button>
		)
	}
});


var CheckboxElement = React.createClass({
	handleChange: function() {
		var newValue = this.refs.isSelected.checked
		
    	this.props.updateAttributeNames(
      		this.props.id,
      		this.props.attributeName,
      		newValue
    )},


	render:function(){
		return(
			<td id="checkbox-div"> 
				<p>{this.props.attributeName.name}</p>
				<input
		            type="checkbox"
		            checked={this.props.attributeName.value}
		            ref="isSelected"
		            onChange={this.handleChange}
		          />
		    </td>
		        
			)
	}
});

var CheckboxRow = React.createClass({
	updateAttributeNames: function(index, attributeName,newValue){
		

		this.props.attributeNames[index].visible = newValue
		this.props.setAttributeNames(this.props.attributeNames);
	}

	,render:function(){
		var update = this.updateAttributeNames
		var checkboxes= [];

		var index = 0;
		this.props.attributeNames.forEach(function(value){
			console.log(index)
			checkboxes.push(<CheckboxElement 
								key={index} 
								id={index} 
								updateAttributeNames={update}
								attributeName={value}/>)
			index++;
			
		});

		return(
			<tr>
				{checkboxes}
			</tr>
			)
	}
});


var ControlPanel = React.createClass({

	render:function(){
		console.log("in CONTROL PANEL")
		

		return(
			<table class="table table-bordered">
			<tbody>
					
						<CheckboxRow 
							setAttributeNames={this.props.setAttributeNames}
							attributeNames={this.props.attributeNames} 
						/>
					
				
			</tbody>
			</table>
			
			)
	}
});

var TableRow = React.createClass({

	render:function(){
		var values = []
		for(var key in this.props.hackerInfo){
			if(this.props.visibleColumns[key]) {
				var value = this.props.hackerInfo[key]
				values.push(<td key={value}>{value}</td>)
			}
		}
		return(
			<tr>
				{values}
			</tr>
			)
	}
});


var TableBody = React.createClass({

	render:function(){
		var rows = []
		for(var i in this.props.hackers){
			var hacker = this.props.hackers[i]			
			 rows.push(<TableRow  key={hacker.email} visibleColumns={this.props.columnNames} hackerInfo={hacker} />)
		}
		return(
			<tbody>
				{rows}
			</tbody>
			)
	}
});


var TableHeader = React.createClass({

	render:function(){
		var names = [];

		for(var key in this.props.columnNames){
			names.push(<th key={key}>{key}</th>)
		};
		return(
			<thead>
			      <tr>
			       {names}
			      </tr>
    		</thead>
		
			)
	}
});


var HackerTable = React.createClass({

	render:function(){

		

		return(
			<table class="table table-bordered">
				<TableHeader
					columnNames={this.props.columnNames}
				/> 
				<TableBody 
					hackers={this.props.hackers}
					columnNames={this.props.columnNames} 
					 />
			</table>
			)
	}
});

var AdminPanel = React.createClass({
	getHackers: function(){
			var self = this;

		var xhr = new XMLHttpRequest();
		 var url = "http://localhost:3000/admin/hackers/all"

		xhr.onload = () => {
		  if (xhr.readyState === 4) {
		    if (xhr.status === 200) {
		    	var responseItem = xhr.response
				var jsoned = JSON.parse(responseItem)
				

				var keyArray =[]
				for(var key in jsoned.hackers[0]){
					if(key !== "admin" && key !== "password"){
						keyArray.push({name:key,visible:true})
					}
				}
				self.setState({
					attributeNames: keyArray,
					hackers:(jsoned.hackers)
				});

		    } else {
		      console.error(xhr.statusText);
		    }
		  }
		};
		xhr.onerror = function (e) {
		  console.error(xhr.statusText);
		};
		xhr.open('GET', url);
		xhr.send();

		// var responseItem = xmlhttp.response
		// var jsoned = JSON.parse(responseItem)
		

		// var keyArray =[]
		// for(var key in jsoned.hackers[0]){
		// 	if(key !== "admin" && key !== "password"){
		// 		keyArray.push({name:key,visible:true})
		// 	}
		// }
		// this.setState({
		// 	attributeNames: keyArray,
		// 	hackers:(jsoned.hackers)
		// });
	},

	


		// xhr.open('GET', url,true);
		// xhr.send(null);

	getInitialState: function() {
		//var initialHackers = this.getHackers();

	    return {
	    	attributeNames: [],
			hackers: {}
	    }
	},




	setAttributeNames: function(attributes){
		this.setState({
			attributeNames: attributes,
			hackers:this.state.hackers
		});
	},setHackers: function(hackers){
		this.setState({
			attributeNames: this.state.attributeNames,
			hackers:hackers
		});
	},

	render: function() {
		
		var newArray = {}
			for(var key in this.state.attributeNames){
				if(this.state.attributeNames[key].visible){
					newArray[this.state.attributeNames[key].name] = true;
				}
			}
			console.log("NEW ARRAY")
			console.log(newArray)
	return (
	<div id="init">
		<SearchButton findHackers={this.getHackers}/>
	  <ControlPanel
	  			setAttributeNames ={this.setAttributeNames}
	  	  		attributeNames={this.state.attributeNames}
	  			findHackers={this.getHackers}
	  	/> 
	  <HackerTable 
	  		columnNames={newArray}
	  		hackers={this.state.hackers}
	  />
	  </div>
	)
	}
});

const app = document.getElementById('container');

ReactDom.render(<AdminPanel />, app);
