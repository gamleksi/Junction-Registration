import React from "react"


export default React.createClass({
    checkBoxSelected: function(e){
        this.props.setAttributeValues(e.target.value);
    }
    ,render:function(){
        var checkboxes= [];
        for(var key in this.props.rowAttributes) {
            checkboxes.push(            
                <label class="checkbox col-sm-2"> 
                    <input
                        type="checkbox"
                        checked={this.props.rowAttributes[key]}
                        value={key}
                        onChange={this.checkBoxSelected}
                      />
                      {key}
                </label> )
        }
        return(
            <div>
                {checkboxes}
            </div>
            )
    }
});

