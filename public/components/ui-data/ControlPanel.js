import React from "react";
import CheckboxRow from "./CheckboxRow";
import SessionInfo from "./SessionInfo";

export default React.createClass({
    render:function(){
        
        return(

            <div class="checkbox-container row">

                        <CheckboxRow 
                            setAttributeValues={this.props.setAttributeValues}
                            rowAttributes={this.props.rowAttributes} 
                        />  
                
            </div>
            )
    }
});