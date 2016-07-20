import React from "react";
import TableRow from "./TableRow";

export default React.createClass({
    
    render:function(){

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