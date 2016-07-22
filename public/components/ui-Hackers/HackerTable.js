import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import HackerTab from "./HackerTab";

export default React.createClass({
    getInitialState: function(){
        return {
            tabChanged: false    
        } 
    },
    changeSheet: function() {
        console.log("huhuun")
        this.setState({
            tabChanged: !this.state.tabChanged                      
        })
    },    
    render:function(){
        var hackers = this.props.hackers;
        if(this.state.tabChanged) {
            hackers = this.props.selectedParticipants
        }

        return(
            <div>
                <HackerTab
                    changeSheet={this.changeSheet}
                    tabChanged={this.state.tabChanged}
                />
                <table class="hacker table table-bordered">
                     <TableHeader
                        tdRowStyle={this.props.tdRowStyle}
                        rowAttributes={this.props.rowAttributes}
                            />
                    <TableBody
                        tdRowStyle={this.props.tdRowStyle}
                        hackers={hackers}
                        rowAttributes={this.props.rowAttributes}
                        addToSelectedList={this.props.addToSelectedList}
                        dropFromSelectedList={this.props.dropFromSelectedList}
                        expandedInfo={this.props.expandedInfo}
                         />
                        
                </table>
            </div>
        )
    }
});