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
        var tab = [
            <HackerTab 
                changeSheet={this.changeSheet}
                tabObject={this.state.tabObject}
                />]
        if(this.state.tabObject[1].visible) {
            hackers = this.props.selectedParticipants;
            tab[0] = [<HackerTab 
                buttonClicked={this.props.acceptSelectedHackers}
                changeSheet={this.changeSheet}
                tabObject={this.state.tabObject}
                tabButton={this.state.tabObject[1].buttonValue}
                />]
        }
        if(this.state.tabObject[2].visible) {
            hackers = this.props.previousAccepted
            tab[0] = [<HackerTab 
                buttonClicked={this.props.reloadPrevious}
                changeSheet={this.changeSheet}
                tabObject={this.state.tabObject}
                tabButton={this.state.tabObject[2].buttonValue}
                />]            
        }

        return(
            <div id="hacker-table">
                {tab}
                <table class="hacker table table-bordered">
                     <TableHeader
                        tdRowStyle={this.props.tdRowStyle}
                        rowAttributes={this.props.rowAttributes}
                            />
                    <TableBody
                        hackerModificationSaved={this.props.hackerModificationSaved} 
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