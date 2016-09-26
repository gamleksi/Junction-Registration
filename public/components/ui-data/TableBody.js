import React from "react";
import TableRow from "./TableRow";

export default React.createClass({
    
    render:function(){

        var rows = []
        console.log(this.props.hackers)
        for(var i in this.props.hackers){
            var hacker = this.props.hackers[i]          
             rows.push(
                <TableRow
                    hackerModificationSaved={this.props.hackerModificationSaved}
                    tdRowStyle={this.props.tdRowStyle}                
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