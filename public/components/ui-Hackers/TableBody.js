import React from "react";
import TableRow from "./TableRow";

export default React.createClass({
    
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