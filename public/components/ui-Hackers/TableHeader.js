import React from "react"

export default React.createClass({
    render:function(){
        var names = [];
        for(var key in this.props.rowAttributes){
          if(this.props.rowAttributes[key]) {
            names.push(<td class="row" style={this.props.tdRowStyle} key={key}><p>{key}</p></td>)  
          }
        };
        console.log("this.props.tdRowStyle")
        console.log(this.props.tdRowStyle)
        // names.push(<td class="row" style={this.props.tdRowStyle} key="reimburesement"><p>travel</p></td>)
        names.push(<td class="row" style={this.props.tdRowStyle} key="button"><p>Button</p></td>)                  
        return(

            <thead>
                  <tr>
                   {names}
                  </tr>
            </thead>
            )
    }
});