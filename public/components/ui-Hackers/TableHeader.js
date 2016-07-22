import React from "react"

export default React.createClass({
    render:function(){
        var names = [];
        for(var key in this.props.rowAttributes){
          if(this.props.rowAttributes[key]) {
            names.push(<td class="row" key={key}>{key}</td>)  
          }
        };
        names.push(<td class="row" key="reimburesement">travel</td>)
        names.push(<td class="row" key="button">Button</td>)                  
        return(
          <table class="hacker table table-bordered">

            <thead>
                  <tr>
                   {names}
                  </tr>
            </thead>
          </table>
            )
    }
});