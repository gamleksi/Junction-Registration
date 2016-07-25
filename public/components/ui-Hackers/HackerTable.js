import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import HackerTab from "./HackerTab";

export default React.createClass({
    getInitialState: function(){
        return {
            tabObject: this.props.tabObject    
        } 
    },
    changeSheet: function(index) {
        var tabObj = []
        for(var i in this.state.tabObject) {
            var t = this.state.tabObject[i];
            if(i==index) {
                t.visible = true;

            } else {
                t.visible = false;
            }
            tabObj.push(t)
        }
        this.setState({
            tabObject: tabObj                      
        })
    },    
    render: function(){
        var hackers = this.props.hackers;
        if(this.state.tabObject[1].visible) {
            hackers = this.props.selectedParticipants
        }

        return(
            <div>
                <HackerTab
                    changeSheet={this.changeSheet}
                    tabObject={this.state.tabObject}
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