import React from "react";
import ControlPanel from "./ControlPanel";
import SearchPanel from "./SearchPanel"
import TableHeader from "./TableHeader";
import HackerTable from "./HackerTable";
import {attrNotBeShown, attrNotBeShownInRows, notBeShownInOpeningRow, tabObject, longComments} from "../HARD_VALUES.js"


export default React.createClass ({


    getHackers: function(){
        var self = this;
        var xhr = new XMLHttpRequest();

        var url = "/partners/hackers/sample"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                
                var rowAttributes = {}                
                
                if(Object.getOwnPropertyNames(this.state.rowAttributes).length === 0) {

                    for(var key in jsoned.hackers[0]){
                        rowAttributes[key] = true
                    }
                    attrNotBeShown.forEach(function(e) {
                        delete rowAttributes[e]
                    })

                    notBeShownInOpeningRow.forEach(function(e) {
                        if(rowAttributes[e]) {
                            rowAttributes[e] = false;
                        }
                    })
                } else {
                    rowAttributes = this.state.rowAttributes;
                }
                var hackers = jsoned.hackers
                var hackerMap = {};
                for(var i in hackers) {
                    hackerMap[hackers[i].email] = i;
                }
                for(var email in this.state.selectedParticipants) {
                    var index = hackerMap[email];
                    if(index && hackers[index].travelReimbursement === undefined) {
                        var index = hackerMap[email]
                        hackers[index].travelReimbursement = this.state.selectedParticipants.travelReimbursement
                    }
                }                
                this.setState({
                    rowAttributes: rowAttributes,
                    hackers: hackers,
                    hackerMap: hackerMap,
                    selectedParticipants: {},
                    previousAccepted: this.state.previousAccepted
                })
            } else {
              console.error(xhr.statusText);

            }
          }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.open('GET', url);
        xhr.send();
    },    
    searchSpecificHackers: function(query) {
        
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "/partners/master-search"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                var rowAttributes = {}                
                if(Object.getOwnPropertyNames(this.state.rowAttributes).length === 0) {

                    for(var key in jsoned.hackers[0]){
                        rowAttributes[key] = true
                    }
                    attrNotBeShown.forEach(function(e) {
                        delete rowAttributes[e]
                    })

                    notBeShownInOpeningRow.forEach(function(e) {
                        if(rowAttributes[e]) {
                            rowAttributes[e] = false;
                        }
                    })
                } else {
                    rowAttributes = this.state.rowAttributes;
                }
                var hackers = jsoned.hackers

                var hackerMap = {};
                for(var i in hackers) {
                    hackerMap[hackers[i].email] = i;
                }
                for(var email in this.state.selectedParticipants) {
                    var index = hackerMap[email];
                    if(index && hackers[index].travelReimbursement !== undefined) {
                        var index = hackerMap[email]
                        hackers[index].travelReimbursement = this.state.selectedParticipants.travelReimbursement
                    }
                }                     
                self.setState({
                    rowAttributes: rowAttributes,
                    hackers: hackers,
                    hackerMap: hackerMap,
                    selectedParticipants: this.state.selectedParticipants,
                    previousAccepted: this.state.previousAccepted
                })
            } else {
              console.error(xhr.statusText);
            }
          }
        };
        xhr.send(JSON.stringify({"query": query}));
    },
    
    getInitialState: function() {
        return {
            rowAttributes: {},
            hackers: {},
            hackerMap: {},
            selectedParticipants: {},
            tabObject: tabObject,
            previousAccepted: {}
        }
    },
    updateHackerIntoList: function(hacker) {
        var hackers = this.state.hackers
        var index = this.state.hackerMap[hacker.email]
        if(index) {
            hackers[index] = hacker;
        }
        return hackers;
    },
    render: function() {        

        if(Object.getOwnPropertyNames(this.state.hackers).length <= 0) {
            this.getHackers()
        }
        var i = 1;
        for(var key in this.state.rowAttributes) {
            if(this.state.rowAttributes[key]) {

                i++;
            }
        }
        var tdRowStyle = {"width": 100/i + '%'};

    return (        
    <div id="init">
        <ControlPanel
                setAttributeValues ={this.setAttributeValues}
                rowAttributes={this.state.rowAttributes}
        />
        <SearchPanel
                searchSpecificHackers ={this.searchSpecificHackers}
                rowAttributes={this.state.rowAttributes}
        /> 
      <HackerTable
            hackerModificationSaved={this.hackerModificationSaved}
            reloadPrevious={this.reloadPrevious}
            tabObject={tabObject}
            acceptSelectedHackers={this.acceptSelectedHackers}
            previousAccepted={this.state.previousAccepted}
            selectedParticipants={this.state.selectedParticipants} 
            tdRowStyle={tdRowStyle}
            rowAttributes={this.state.rowAttributes}
            hackers={this.state.hackers}
            addToSelectedList={this.addToSelectedList}
            dropFromSelectedList={this.dropFromSelectedList}
            expandedInfo={longComments}
      />
      </div>
    )
    }
});