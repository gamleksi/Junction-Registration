import React from "react";
import ControlPanel from "./ControlPanel";
import HackerTable from "./HackerTable";
import SearchButton from "./SearchButton";


//Hardcoded values


var attrNotBeShown = ["admin", "password"]; //TODO: deleting needs to be done already in backend!!

var attrNotBeShownInRows = ["skillDescription", "motivation"];

var notBeShownInOpeningRow = ["email"];


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

/*
         <AdminPanel>      
      /           \
   Control     <rowArray>
    /              \ 
 ControlPanel       <HackerTable>

                         \
                         <TableBody>
                             \
                         <TableRow>   
                         filteröinti

*/



    },
    
    getInitialState: function() {
        return {
            rowAttributes: {},
            attributeNames: [],
            hackers: {},
            selectedParticipants: {}
        }
    },
    setAttributeValues: function(key){
        var attributes = this.state.rowAttributes
        attributes[key] = !(attributes[key]) 
        this.setState({
            rowAttributes: attributes,
            attributeNames: this.state.attributeNames,
            hackers:this.state.hackers,
            selectedParticipants: this.state.selectedParticipants
        });
    },
    addToSelectedList: function(hacker, travelReImbursement) {
        var selected = this.state.selectedParticipants
        if(!selected[hacker.email]) {
            console.log("selected")
            hacker["travelReImbursement"] = travelReImbursement;
            selected[hacker.email] = hacker; 
        }
        this.setState({
                rowAttributes: this.state.rowAttributes,
                attributeNames: this.state.attributeNames,
                hackers: this.state.hackers,
                selectedParticipants: selected
        })
    },
    dropFromSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants        
        if(selected[hacker.email]) {
            console.log("dropped: " + "hacker.email")
            delete selected[hacker.email];
            this.setState({
                rowAttributes: this.state.rowAttributes,
                attributeNames: this.state.attributeNames,
                hackers: this.state.hackers,
                selectedParticipants: selected
            })            
        } 
    },

    acceptSelectedHackers: function() {
        var self = this;
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:3000/admin/hackers/accept-selected"
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var selectedArr = Object.keys(this.state.selectedParticipants);
        xhr.onload = function() {
            if (this.readyState === 4) {
                var responseItem = this.response;
                console.log("Accepted");
                console.log(JSON.parse(responseItem).accepted)
            }
        }
        console.log("selectedarr")
        console.log(selectedArr);
        xhr.send(JSON.stringify({"selected": selectedArr}));
    },
    render: function() {
        

        if(Object.getOwnPropertyNames(this.state.hackers).length <= 0) {
            this.getHackers()
        }

    return (
    <div id="init">
        <SearchButton findHackers={this.acceptSelectedHackers}/>
        <ControlPanel
                setAttributeValues ={this.setAttributeValues}
                rowAttributes={this.state.rowAttributes}
                findHackers={this.getHackers}
                selectedParticipants={this.state.selectedParticipants} 
        /> 
      <HackerTable 
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