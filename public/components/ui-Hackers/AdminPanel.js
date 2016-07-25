import React from "react";
import ControlPanel from "./ControlPanel";
import SearchButton from "./SearchButton";
import TableHeader from "./TableHeader";
import HackerTable from "./HackerTable";



//Hardcoded values


var attrNotBeShown = ["admin", "password"]; //TODO: deleting needs to be done already in backend!!

var attrNotBeShownInRows = ["question1", "question2", "comment"];

var notBeShownInOpeningRow = ["email"];

var tabObject = [
    {
        tabValue: "Hackers",
        visible: true
    },{
        tabValue: "Selected",
        visible: false
    }
];


export default React.createClass ({

    getHackers: function(){
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/admin/hackers/all"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                
                var rowAttributes = {}

                for(var key in jsoned.hackers[0]){
                    rowAttributes[key] = true
                }
                attrNotBeShown.forEach(function(e) {
                    delete rowAttributes[e]
                })

                var attributes = rowAttributes;

                attrNotBeShownInRows.forEach(function(e) {
                    delete rowAttributes[e]
                })
                notBeShownInOpeningRow.forEach(function(e) {
                    if(rowAttributes[e]) {
                        rowAttributes[e] = false;
                    }
                })
                var hackers = jsoned.hackers.map(function(obj, i) {
                    obj["index"] = i;
                    return obj;
                })
                this.setState({
                    rowAttributes : rowAttributes,
                    attributeNames: attributes,
                    hackers: hackers,
                    selectedParticipants: {}
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
        var url = "http://localhost:3000/admin/hackers/accepted"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                
                var rowAttributes = {}

                for(var key in jsoned.hackers[0]){
                    rowAttributes[key] = true
                }
                attrNotBeShown.forEach(function(e) {
                    delete rowAttributes[e]
                })

                var attributes = rowAttributes;

                attrNotBeShownInRows.forEach(function(e) {
                    delete rowAttributes[e]
                })
                notBeShownInOpeningRow.forEach(function(e) {
                    if(rowAttributes[e]) {
                        rowAttributes[e] = false;
                    }
                })                
                this.setState({
                    rowAttributes : rowAttributes,
                    attributeNames: attributes,
                    hackers:(jsoned.hackers),
                    selectedParticipants: {}
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
            selectedParticipants: {},
            tabObject: tabObject
        }
    },
    setAttributeValues: function(key){
        var attributes = this.state.rowAttributes
        attributes[key] = !(attributes[key]) 
        this.setState({
            rowAttributes: attributes,
            attributeNames: this.state.attributeNames,
            hackers:this.state.hackers,
            selectedParticipants: this.state.selectedParticipants,
        });
    },
    addToSelectedList: function(hacker, travelReimbursement) {
        var selected = this.state.selectedParticipants;
        console.log("selected")
        console.log(travelReimbursement);
        if(!selected[hacker.email] || hacker["travelReimbursement"] !== travelReimbursement) {
            
            hacker["travelReimbursement"] = travelReimbursement;
            selected[hacker.email] = hacker; 
            var hackers = this.state.hackers;
            hackers[hacker.index].travelReimbursement = travelReimbursement;
            console.log(hackers[hacker.index])
            this.setState({
                    rowAttributes: this.state.rowAttributes,
                    attributeNames: this.state.attributeNames,
                    hackers: hackers,
                    selectedParticipants: selected,
            })        
        }
    },
    dropFromSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants        
        if(selected[hacker.email]) {
            console.log("dropped: " + "hacker.email")
            delete selected[hacker.email];
            var hackers = this.state.hackers;
            hackers[hacker.index].travelReimbursement = undefined;            
            this.setState({
                rowAttributes: this.state.rowAttributes,
                attributeNames: this.state.attributeNames,
                hackers: hackers,
                selectedParticipants: selected,
            })            
        } 
    }
    ,acceptSelectedHackers: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/admin/hackers/accept-selected"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var selectedObj = this.state.selectedParticipants;
        xhr.onload = function() {
            if (this.readyState === 4) {
                var responseItem = this.response;
                console.log("Accepted");
                console.log(JSON.parse(responseItem).accepted)
            }
        }
        console.log("selectedarr")
        console.log(selectedObj);
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

        console.log("")


    return (        
    <div id="init">
        <button onClick={this.getHackers}>All hackers</button>
        <button onClick={this.getAcceptedHackers}>Accepted hackers</button>

        <SearchButton findHackers={this.acceptSelectedHackers}/>
        <ControlPanel
                setAttributeValues ={this.setAttributeValues}
                rowAttributes={this.state.rowAttributes}
                findHackers={this.getHackers}
                selectedParticipants={this.state.selectedParticipants} 
        /> 
      <HackerTable
            tabObject={tabObject}
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