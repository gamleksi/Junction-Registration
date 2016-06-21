import React from "react";
import CheckboxRow from "./CheckboxRow";


export default React.createClass({
    render:function(){
        console.log("in CONTROL PANEL")
        
        return(
            <table class="table table-bordered">
            <tbody>
                    
                        <CheckboxRow 
                            setAttributeNames={this.props.setAttributeNames}
                            attributeNames={this.props.attributeNames} 
                        />
                    
                
            </tbody>
            </table>
            
            )
    }
});