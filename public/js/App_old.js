// <div class="container">
//   <h2>Bordered Table</h2>
//   <p>The .table-bordered class adds borders to a table:</p>            
//   <table class="table table-bordered">
//     <thead>
//       <tr>
//         <th>Firstname</th>
//         <th>Lastname</th>
//         <th>Email</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>John</td>
//         <td>Doe</td>
//         <td>john@example.com</td>
//       </tr>
//       <tr>
//         <td>Mary</td>
//         <td>Moe</td>
//         <td>mary@example.com</td>
//       </tr>
//       <tr>
//         <td>July</td>
//         <td>Dooley</td>
//         <td>july@example.com</td>
//       </tr>
//     </tbody>
//   </table>
// </div>


// - FilterableProductTable
//   - SearchBar
//   - ProductTable
//     - ProductCategoryRow
//     - ProductRow

/*
<AdminPanel>

<HackerTable>
<table class="table table-bordered">
	{<TableHeader
	
		/>}
  </table>


<TableHeader>
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>


<TableBody>
<tbody>

   </tbody>
	
	<TableRow>
      <tr>
        <td>{this.props.name}</td>
        <td>{}</td>
        <td>{}</td>
      </tr>
      
   


*/



// var ProductCategoryRow = React.createClass({
//   render: function() {
//     return (<tr><th colSpan="2">{this.props.category}</th></tr>);
//   }
// });

// var ProductRow = React.createClass({
//   render: function() {
//     var name = this.props.product.stocked ?
//       this.props.product.name :
//       <span style={{color: 'red'}}>
//         {this.props.product.name}
//       </span>;
//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{this.props.product.price}</td>
//       </tr>
//     );
//   }
// });

// var ProductTable = React.createClass({
//   render: function() {
//     var rows = [];
//     var lastCategory = null;
//     this.props.products.forEach(function(product) {
//       if (product.category !== lastCategory) {
//         rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
//       }
//       rows.push(<ProductRow product={product} key={product.name} />);
//       lastCategory = product.category;
//     });
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// });

// var SearchBar = React.createClass({
//   render: function() {
//     return (
//       <form>
//         <input type="text" placeholder="Search..." />
//         <p>
//           <input type="checkbox" />
//           {' '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// });

// var FilterableProductTable = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <SearchBar />
//         <ProductTable products={this.props.products} />
//       </div>
//     );
//   }
// });

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
			<div id="checkboxrow">
				{checkboxes}
			</div>
			)
	}
});


var ControlPanel = React.createClass({

	render:function(){
		console.log("in CONTROL PANEL")
		

		return(
			<table class="table table-bordered">
			<tbody>
				<tr>
					
						<CheckboxRow 
							setAttributeNames={this.props.setAttributeNames}
							attributeNames={this.props.attributeNames} 
						/>
					
				</tr>
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
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/admin/hackers/all"

		xmlhttp.open('GET', url, false);
		xmlhttp.send();

		var responseItem = xmlhttp.response
		var jsoned = JSON.parse(responseItem)
		

		var keyArray =[]
		for(var key in jsoned.hackers[0]){
			if(key !== "admin" && key !== "password"){
				keyArray.push({name:key,visible:true})
			}
		}
		return{
			attributeNames: keyArray,
			hackers:(jsoned.hackers)
		};
	},

	getInitialState: function() {
		var initialHackers = this.getHackers();

	    return {
	    	attributeNames: initialHackers.attributeNames,
			hackers: initialHackers.hackers
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
