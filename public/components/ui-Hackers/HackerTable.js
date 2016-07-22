import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default React.createClass({
    render:function(){
                console.log("fuck")
        console.log(this.props.tdRowStyle)
        return(
            <table class="hacker table table-bordered">
                 <TableHeader
                    tdRowStyle={this.props.tdRowStyle}
                    rowAttributes={this.props.rowAttributes}
                        />
                <TableBody
                    tdRowStyle={this.props.tdRowStyle}
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