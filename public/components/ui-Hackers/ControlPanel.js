import React from "react";
import CheckboxRow from "./CheckboxRow";
import SessionInfo from "./SessionInfo";

export default React.createClass({
    render:function(){
        
        return(
            <div>
            <table class="table table-bordered">
            <tbody>
                        <SessionInfo
                            selectedParticipants={this.props.selectedParticipants}
                        />
            </tbody>

            </table>
            <div class="container">

                        <CheckboxRow 
                            setAttributeValues={this.props.setAttributeValues}
                            rowAttributes={this.props.rowAttributes} 
                        />  
                
            </div>
            </div>
            )
    }
});