import React from "react"
import CheckboxElement from "./CheckboxElement"


export default React.createClass({
    updateAttributeNames: function(index, attributeName,newValue){
        
        this.props.attributeNames[index].visible = newValue
        this.props.setAttributeNames(this.props.attributeNames);
    }
    ,render:function(){
        var update = this.updateAttributeNames
        var checkboxes= [];
        var index = 0;
        this.props.attributeNames.forEach(function(value){
            console.log(index)
            checkboxes.push(<CheckboxElement 
                                key={index} 
                                id={index} 
                                updateAttributeNames={update}
                                attributeName={value}/>)
            index++; 
        });
        return(
            <div id="checkboxrow">
                {checkboxes}
            </div>
            )
    }
});