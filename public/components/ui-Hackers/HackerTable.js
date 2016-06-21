import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default React.createClass({
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