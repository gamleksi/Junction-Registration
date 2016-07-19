import React from "react"

export default React.createClass({
    render:function(){
        var names = [];
        for(var key in this.props.columnNames){
          console.log("TableHeader")
            console.log(key)
            names.push(<td key={key}>{key}</td>)
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