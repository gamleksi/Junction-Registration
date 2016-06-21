import React from "react";

export default React.createClass({
    handleChange: function() {
        var newValue = this.refs.isSelected.checked
        this.props.updateAttributeNames(
            this.props.id,
            this.props.attributeName,
            newValue
    )},
    render:function(){
        return(
            <td id="checkbox-div"> 
                <p>{this.props.attributeName.name}</p>
                <input
                    type="checkbox"
                    checked={this.props.attributeName.value}
                    ref="isSelected"
                    onChange={this.handleChange}
                  />
            </td>     
            )
    }
});