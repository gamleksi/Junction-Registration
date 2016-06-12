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

var DataButton = React.createClass({
	findHackers: function() {
	  this.props.findHackers();
	},
	render: function() {
		return (
			<button onClick={this.findHackers}>Euroopan kovimmat koodarit</button>
		)
	}
})

var TotalNumber = React.createClass({
	render: function() {
		return (
			<h1>{this.props.num}</h1>
		)
	}
})

var AdminPanel = React.createClass({
	getInitialState: function() {
	    return {
			hackers: 0
	    }
	},

	findHackers: function(){
				
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/admin/hackers/all"

		xmlhttp.open('GET', url, false);
		xmlhttp.send();

		var responseItem = xmlhttp.response
		var jsoned = JSON.parse(responseItem)
		console.log(responseItem)
		this.setState({
			hackers: Object.keys(jsoned.hackers).length
		});

	},

	render: function() {
	return (
	  <div>
	  	<DataButton
	  		findHackers={this.findHackers}
	  	/>
	    <a>Hello World</a>
	    <TotalNumber
	    	num={this.state.hackers}
	    />
	  </div>
	);
	}
});

const app = document.getElementById('container');

ReactDom.render(<AdminPanel/>, app);