import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default React.createClass({
    render:function(){
        
         var newArray = {}
         var col = this.props.columnNames
            for(var key in col){
                var item = col[key]
                if(item.visible && item.name !== "subscription" && item.name !== "skillDescription"){
                    newArray[item.name] = true;
                }
            }

        return(
            <table class="table table-inverse">
                <TableHeader
                    columnNames={newArray}
                /> 
                <TableBody 
                    hackers={this.props.hackers}
                    columnNames={this.props.columnNames} 
                    allValues={this.props.columnNames}
                     />
            </table>
            )
    }
});