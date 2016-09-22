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

        var url = "/admin/hackers/all"
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
                if(Object.getOwnPropertyNames(this.state.rowAttributes).length === 0) {

                    for(var key in jsoned.hackers[0]){
                        rowAttributes[key] = true
                    }
                    attrNotBeShown.forEach(function(e) {
                        delete rowAttributes[e]
                    })

                    // attrNotBeShownInRows.forEach(function(e) {
                    //     delete rowAttributes[e]
                    // })
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

    hackerModificationSaved: function(hacker, callback){
        var hacker = hacker;
        var selected = this.state.selectedParticipants;
        var previous = this.state.previousAccepted;
        var hackers = this.state.hackers;
        if(this.state.previousAccepted[hacker.email]) {
            previous[hacker.email] = hacker;
        }
        if(this.state.selectedParticipants[hacker.email]) {
            selected[hacker.email] = hacker;
        }
        if(this.state.hackerMap[hacker.email]) {
            hackers[this.state.hackerMap[hacker.email]] = hacker;
        }

        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "/admin/hackers/save-modification"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                self.setState({
                    rowAttributes: this.state.rowAttributes,
                    hackers: hackers,
                    hackerMap: this.state.hackerMap,
                    selectedParticipants: selected,
                    previousAccepted: previous            
                })
                callback(true)
            } else {
                callback(false)
            }
          }
        };
        xhr.send(JSON.stringify({"hacker": hacker}));                  
    },    
    searchSpecificHackers: function(query) {
        
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "/admin/master-search"
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
    setAttributeValues: function(key){
        var attributes = this.state.rowAttributes
        attributes[key] = !(attributes[key]) 
        this.setState({
            rowAttributes: attributes,
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
            delete selected[hacker.email];
            hacker["travelReimbursement"] = undefined;
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
            var hacker = updated[i]
            hackersObj[hacker.email] = hacker;
            var index = this.state.hackerMap[hacker.email];
            if(index) {
                hackers[index] = hacker;
            }
        }
        this.setState({
            rowAttributes: this.state.rowAttributes,
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
                if(jsoned.statusCode === 200 || jsoned.statusCode === 202) {
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
        
        <SearchPanel
                searchSpecificHackers ={this.searchSpecificHackers}
                rowAttributes={this.state.rowAttributes}
        /> 

        <ControlPanel
                setAttributeValues ={this.setAttributeValues}
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