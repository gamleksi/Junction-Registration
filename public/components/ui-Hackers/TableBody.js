import React from "react";
import TableRow from "./TableRow";

export default React.createClass({
    
    render:function(){
        var values = []
        for(var key in this.props.hackerInfo){
            if(this.props.visibleColumns[key]) {
                var value = this.props.hackerInfo[key]
                values.push(<td key={value}>{value}</td>)
            }
        }
        return (
            <tr>
                {values}
            </tr>
        )
    }
});