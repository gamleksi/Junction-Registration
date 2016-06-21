import React from "react"
import CheckboxElement from "./CheckboxElement"

export default React.createClass({
    render:function(){
        var names = [];
        for(var key in this.props.columnNames){
            names.push(<th key={key}>{key}</th>)
        };
        return(
            <thead>
                  <tr>
                   {names}
                  </tr>
            </thead>
        
            )
    }
});