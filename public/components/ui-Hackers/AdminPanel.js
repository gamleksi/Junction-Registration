import React from "react";
import ControlPanel from "./ControlPanel";
import TableHeader from "./TableHeader";
import HackerTable from "./HackerTable";
import {attrNotBeShown, attrNotBeShownInRows, notBeShownInOpeningRow, tabObject, domain} from "../HARD_VALUES.js"


export default React.createClass ({


    getHackers: function(){
        var self = this;
        var xhr = new XMLHttpRequest();

        var url = "/admin/hackers/all"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                
                var rowAttributes = {}                
                var attributes = rowAttributes;
                
                if(Object.getOwnPropertyNames(this.state.rowAttributes).length === 0) {

                    for(var key in jsoned.hackers[0]){
                        rowAttributes[key] = true
                    }
                    attrNotBeShown.forEach(function(e) {
                        delete rowAttributes[e]
                    })

                    attrNotBeShownInRows.forEach(function(e) {
                        delete rowAttributes[e]
                    })
                    notBeShownInOpeningRow.forEach(function(e) {
                        if(rowAttributes[e]) {
                            rowAttributes[e] = false;
                        }
                    })
                } else {
                    rowAttributes = this.state.rowAttributes;
                    attributes = this.state.attributeNames;                    
                }
                var hackers = jsoned.hackers
                var hackerMap = hackers.map(function(hacker, i) {
                    var obj = {}
                    obj[hacker.email] = i;
                    return obj;
                })
                console.log("rowAttributes")
                console.log(rowAttributes)
                this.setState({
                    rowAttributes: rowAttributes,
                    attributeNames: attributes,
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


    getAcceptedHackers: function(){
        var self = this;
        var xhr = new XMLHttpRequest();
        var url =  "/admin/hackers/accepted"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)


                var rowAttributes = {}                
                var attributes = rowAttributes;
                if(Object.getOwnPropertyNames(this.state.rowAttributes).length === 0) {

                    for(var key in jsoned.hackers[0]){
                        rowAttributes[key] = true
                    }
                    attrNotBeShown.forEach(function(e) {
                        delete rowAttributes[e]
                    })

                    attrNotBeShownInRows.forEach(function(e) {
                        delete rowAttributes[e]
                    })
                    notBeShownInOpeningRow.forEach(function(e) {
                        if(rowAttributes[e]) {
                            rowAttributes[e] = false;
                        }
                    })
                } else {
                    rowAttributes = this.state.rowAttributes;
                    attributes = this.state.attributeNames;                    
                }
                var hackers = jsoned.hackers
                var hackerMap = hackers.map(function(hacker, i) {
                    var obj = {}
                    obj[hacker.email] = i;
                    return obj;
                })                        
                this.setState({
                    rowAttributes: rowAttributes,
                    attributeNames: attributes,
                    hackers:(jsoned.hackers),
                    hackerMap: hackerMap,
                    selectedParticipants: this.state.selectedParticipants,
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

    

    
    getInitialState: function() {
        return {
            rowAttributes: {},
            attributeNames: [],
            hackers: {},
            hackerMap: {},
            selectedParticipants: {},
            tabObject: tabObject,
            previousAccepted: {}
        }
    },
    setAttributeValues: function(key){
        var attributes = this.state.rowAttributes
        attributes[key] = !(attributes[key]) 
        this.setState({
            rowAttributes: attributes,
            attributeNames: this.state.attributeNames,
            hackers:this.state.hackers,
            hackerMap: this.state.hackerMap,
            selectedParticipants: this.state.selectedParticipants,
        });
    },
    updateHackerIntoList: function(hacker) {
        var hackers = this.state.hackers
        var index = this.state.hackerMap[hacker.email]
        if(index) {
            hackers[index] = hacker;
        }
        return hackers;
    },
    addToSelectedList: function(hacker, travelReimbursement) {
        var selected = this.state.selectedParticipants;

        if(!selected[hacker.email] || hacker["travelReimbursement"] !== travelReimbursement) {
    
            hacker["travelReimbursement"] = travelReimbursement;
            selected[hacker.email] = hacker;
            var hackers = this.updateHackerIntoList(hacker);
            this.setState({
                    rowAttributes: this.state.rowAttributes,
                    attributeNames: this.state.attributeNames,
                    hackers: hackers,
                    hackerMap: this.state.hackerMap,
                    selectedParticipants: selected,
                    previousAccepted: this.state.previousAccepted
            })        
        }
    },
    dropFromSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants        
        if(selected[hacker.email]) {
            console.log("dropped: " + "hacker.email")
            delete selected[hacker.email];
            delete hacker["travelReimbursement"];
            var hackers = this.updateHackerIntoList(hacker);
            this.setState({
                rowAttributes: this.state.rowAttributes,
                attributeNames: this.state.attributeNames,
                hackers: hackers,
                hackerMap: this.state.hackerMap,
                selectedParticipants: selected,
                previousAccepted: this.state.previousAccepted
            })            
        } 
    },
    updateHackersAfterReload: function(updated) {

        var hackersObj = {}
        var hackers = this.state.hackers;
        for(var i in updated) {
            console.log(updated[i]);
            var hacker = updated[i]
            hackersObj[hacker.email] = hacker;
            var index = this.state.hackerMap[hacker.email];
            if(index) {
                hackers[index] = hacker;
            }
        }

        this.setState({
            rowAttributes: this.state.rowAttributes,
            attributeNames: this.state.attributeNames,
            hackers: hackers,
            hackerMap: this.state.hackerMap,
            selectedParticipants: this.state.selectedParticipants,
            previousAccepted: hackersObj,      
        })
    },
    reloadPrevious: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "/admin/hackers/reload-previous"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var previousObj = this.state.previousAccepted;
        xhr.onload = function() {

            if (this.readyState === 4 && this.status === 200) {

                var responseItem = xhr.response;
                var jsoned = JSON.parse(responseItem)

                self.updateHackersAfterReload(jsoned.updated)
            } else {
                console.log("Something went wrong, error code: " + this.status);
            }
        }
        console.log("previousObj")
        console.log(previousObj);
        xhr.send(JSON.stringify({"previous": previousObj}));        
    },    
    updateHackersAfterInvitation: function(accepted) {
        var hackersObj = this.state.previousAccepted;
        var hackers = this.state.hackers;
        for(var i in accepted) {
            var hacker = accepted[i];
            hackersObj[hacker.email] = hacker;
            var index = this.state.hackerMap[hacker.email];
            if(index) {
                hackers[index] = hacker;
            }
        }
        this.setState({
            rowAttributes: this.state.rowAttributes,
            attributeNames: this.state.attributeNames,
            hackers: hackers,
            hackerMap: this.state.hackerMap,
            selectedParticipants: {},
            previousAccepted: hackersObj,      
        })
    },
    acceptSelectedHackers: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "/admin/hackers/accept-selected"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var selectedObj = this.state.selectedParticipants;
        xhr.onload = function() {
            
            if (this.readyState === 4 && this.status === 200) {
                var responseItem = xhr.response;
                var jsoned = JSON.parse(responseItem)
                console.log(jsoned)
                if(jsoned.statusCode === 200 || jsoned.statusCode === 202) {
                    console.log("responseItem.statusCode")
                    self.updateHackersAfterInvitation(jsoned.accepted)
                }
            } else {
                console.log("Something went wrong, error code: " + this.status);
            }
        }

        xhr.send(JSON.stringify({"selected": selectedObj}));
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
        <button onClick={this.getHackers}>All hackers</button>
        <button onClick={this.getAcceptedHackers}>Accepted hackers</button>
        
        <ControlPanel
                setAttributeValues ={this.setAttributeValues}
                rowAttributes={this.state.rowAttributes}
                findHackers={this.getHackers}
                selectedParticipants={this.state.selectedParticipants} 
        /> 
      <HackerTable

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
            expandedInfo={attrNotBeShownInRows}
      />
      </div>
    )
    }
});