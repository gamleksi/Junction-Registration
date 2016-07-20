import React from "react"

export default React.createClass({
    render:function(){
        var names = [];
        for(var key in this.props.rowAttributes){
          if(this.props.rowAttributes[key]) {
            names.push(<td key={key}>{key}</td>)  
          }
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