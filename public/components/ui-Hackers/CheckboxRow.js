import React from "react"


export default React.createClass({
    checkBoxSelected: function(e){
        this.props.setAttributeValues(e.target.value);
    }
    ,render:function(){
        var checkboxes= [];
        for(var key in this.props.rowAttributes) {
            checkboxes.push(            
                <td id="checkbox-div"> 
                    <p>{key}</p>
                    <input
                        type="checkbox"
                        checked={this.props.rowAttributes[key]}
                        value={key}
                        onChange={this.checkBoxSelected}
                      />
                </td> )
        }
        return(
            <tr>
                {checkboxes}
            </tr>
            )
    }
});