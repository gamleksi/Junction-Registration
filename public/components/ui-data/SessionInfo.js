import React from "react";

export default React.createClass({

    render:function(){
        console.log(this.props.selectedParticipants)
        var selectedAmount = 0;
        if(this.props.selectedParticipants) {
            selectedAmount = Object.keys(this.props.selectedParticipants).length
        }
        return(
                <p>{selectedAmount}</p>
            )
    }
});