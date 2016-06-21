import React from "react";

export default React.createClass({
    getInitialState:function(){
        return {expand: false}
    }
    ,handleClick: function(){
        console.log("clicked")
        this.setState({
            expand:!(this.state.expand)
        })
    }
    ,render:function(){

        var values = []
        for(var key in this.props.hackerInfo){
            if(this.props.visibleColumns[key]) {
                var value = this.props.hackerInfo[key]
                values.push(<td key={value}>{value}</td>)
            }
        }
        if(this.state.expand == true){
             return(
            <tr height="300" onClick={this.handleClick}>
                    {values}
                </tr>
                )
        }
        else {
            return(
                <tr onClick={this.handleClick}>
                    {values}
                </tr>
                )
        }
    }
});