import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default React.createClass({
    render:function(){
        console.log("hackertable")
        console.log(this.props.columnNames)
        var headerAttr = this.props.columnNames
        delete headerAttr["skillDescription"]
        delete headerAttr["motivation"]

        return(
            <table class="hacker table table-striped">
                <TableHeader
                    columnNames={headerAttr}
                /> 
                <TableBody 
                    hackers={this.props.hackers}
                    columnNames={this.props.columnNames}
                    addToSelectedList={this.props.addToSelectedList}
                    dropFromSelectedList={this.props.dropFromSelectedList}
                     />
                    }
            </table>
            )
    }
});