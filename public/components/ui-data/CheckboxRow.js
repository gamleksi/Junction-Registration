import React from "react";


export default React.createClass({
    
    getInitialState() {
        return {
            attributes: this.props.rowAttributes
        }
    },
    checkBoxSelected: function(e){
        var attr = this.state.attributes;
        attr[e.target.value] = !attr[e.target.value]
        this.setState({
            attributes: attr
        });
    },
    changeAttributes: function() {
        this.props.setAttributeValues(this.state.attributes);
    }
    ,render:function(){
        var checkboxes= [];
        for(var key in this.props.rowAttributes) {
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

