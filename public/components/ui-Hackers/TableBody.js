import React from "react";
import TableRow from "./TableRow";

export default React.createClass({
    
    render:function(){

        var names = [];
        for(var key in this.props.rowAttributes){
          if(this.props.rowAttributes[key]) {
            names.push(<td class="row" key={key}><p>{key}</p></td>)  
          }
        };
        names.push(<td class="row" key="reimburesement"><p>Reimburesement</p></td>)
        names.push(<td class="row" key="button"><p>Button</p></td>)  


        var rows = []
        for(var i in this.props.hackers){
            var hacker = this.props.hackers[i]          
             rows.push(
                <TableRow 
                    dropFromSelectedList={this.props.dropFromSelectedList}
                    addToSelectedList={this.props.addToSelectedList}
                    visibleColumns={this.props.rowAttributes}
                    hackerInfo={hacker}
                    expandedInfo={this.props.expandedInfo}
                    />
                )
        }
        return(
            <tbody>
             
                {rows}
            </tbody>
            )
    }
});

   // <tr class="header">
   //                  {names}
   //              </tr>