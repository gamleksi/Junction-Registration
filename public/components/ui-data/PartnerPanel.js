import React from "react";
import ControlPanel from "./ControlPanel";
import SearchPanel from "./SearchPanel"
import TableHeader from "./TableHeader";
import PartnerTable from "./PartnerTable";
import {attrNotBeShown, attrNotBeShownInRows, notBeShownInOpeningRow, partnerTabs, longComments} from "../HARD_VALUES.js"


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
                    rowAttributes["selected"] = true;
                } else {
                    rowAttributes = this.state.rowAttributes;
                }
                var hackers = jsoned.hackers
                var hackerMap = {};
                for(var i in hackers) {
                    hackers[i]["selected"] = false;
                    hackerMap[hackers[i].email] = i;
                }
                for(var email in this.state.selectedParticipants) {
                    var index = hackerMap[email];
                    if(index) {
                        hackers[index]["selected"] = true;
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
                    hackers[i].selected = false;
                }
                for(var email in this.state.selectedParticipants) {
                    var index = hackerMap[email];
                    if(index) {
                        hackers[index]["selected"] = true;
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
            tabObject: partnerTabs,
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
    setAttributeValues: function(attr){
        var attributes = attr
        this.setState({
            rowAttributes: attributes,
            hackers:this.state.hackers,
            hackerMap: this.state.hackerMap,
            selectedParticipants: this.state.selectedParticipants,
        });
    },
    addToSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants;
    
            hacker["selected"] = true;
            selected[hacker.email] = hacker;
            var hackers = this.updateHackerIntoList(hacker);
            this.setState({
                    rowAttributes: this.state.rowAttributes,
                    hackers: hackers,
                    hackerMap: this.state.hackerMap,
                    selectedParticipants: selected,
                    previousAccepted: this.state.previousAccepted
            });        
    },
    exportSelected: function() {
        console.log("export")
    },
    dropFromSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants        

        delete selected[hacker.email];
        hacker["selected"] = false;
        var hackers = this.updateHackerIntoList(hacker);
        this.setState({
            rowAttributes: this.state.rowAttributes,
            attributeNames: this.state.attributeNames,
            hackers: hackers,
            hackerMap: this.state.hackerMap,
            selectedParticipants: selected,
            previousAccepted: this.state.previousAccepted
        })            
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

        console.log("partnerTabs " + partnerTabs)

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
       <PartnerTable
            partnerPanel={this.props.partnerPanel}
            exportSelected={this.exportSelected}
            tabObject={partnerTabs}
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