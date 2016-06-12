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

// - FilterableProductTable
//   - SearchBar
//   - ProductTable
//     - ProductCategoryRow
//     - ProductRow
import React from "react";
import ReactDom from "react-dom";

var AdminPanel = React.createClass({
  render: function() {
    return (
      <div>
        <a>Hello World</a>
      </div>
    );
  }
});



// var TableHeader = React.createClass({
//   render: function() {
//     return (<thead>
//               <tr>
//                 <th>Firstname</th>
//                 <th>Lastname</th>
//                 <th>Email</th>
//               </tr>
//             </thead>);
//   }
// });



// var ProfileRow = React.createClass({
//   render: function() {
//     var name = this..propsproduct.stocked ?
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


const app = document.getElementById('container');

ReactDom.render(<AdminPanel/>, app);