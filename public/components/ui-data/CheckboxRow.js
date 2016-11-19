import React from "react";


export default React.createClass({
    
    getInitialState: function() {
        return {
            attributes: undefined
        }
    },
    checkBoxSelected: function(e){
        var attr = this.state.attributes;
        attr[e.target.value] = !this.state.attributes[e.target.value]
        this.setState({
            attributes: attr
        })
    },
    changeAttributes: function() {
        this.props.setAttributeValues(this.state.attributes);
    }
    ,render:function(){
        if(!this.state.attributes && Object.keys(this.props.rowAttributes).length !== 0) {
            console.log(this.props.rowAttributes);
            this.setState({
                attributes: this.props.rowAttributes
            })
        }
        var checkboxes= [];
        for(var key in this.state.attributes) {
            checkboxes.push(            
                <label class="checkbox col-sm-2"> 
                    <input
                        type="checkbox"
                        checked={this.state.attributes[key]}
                        value={key}
                        onChange={this.checkBoxSelected}
                      />
                      {key}
                </label> )
        }
        return(
            <div>
                <div>
                    {checkboxes}
                </div>
                <button onClick={this.changeAttributes}>Set Columns</button>
            </div>
            )
    }
});

