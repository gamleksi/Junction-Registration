import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default React.createClass({
    render:function(){
        console.log(this.props.rowAttributes)
        return(
            <table class="hacker table table-striped">
                <TableHeader
                    rowAttributes={this.props.rowAttributes}
                /> 
                <TableBody 
                    hackers={this.props.hackers}
                    rowAttributes={this.props.rowAttributes}
                    addToSelectedList={this.props.addToSelectedList}
                    dropFromSelectedList={this.props.dropFromSelectedList}
                    expandedInfo={this.props.expandedInfo}
                     />
                    
            </table>
            )
    }
});