import React from "react";
import CheckboxRow from "./CheckboxRow";
import SessionInfo from "./SessionInfo";


export default React.createClass({
    render:function(){
        console.log("in CONTROL PANEL")
        
        return(
            <table class="table table-bordered">
            <tbody>
                        <SessionInfo
                            selectedParticipants={this.props.selectedParticipants}
                        />
            </tbody>
            <tbody>

                        <CheckboxRow 
                            setAttributeValues={this.props.setAttributeValues}
                            rowAttributes={this.props.rowAttributes} 
                        />  
                
            </tbody>
            </table>
            
            )
    }
});