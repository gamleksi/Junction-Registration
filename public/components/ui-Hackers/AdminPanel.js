import React from "react";
import ControlPanel from "./ControlPanel";
import HackerTable from "./HackerTable";
import SearchButton from "./SearchButton";


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
                
                var panelArray =[]
                var rowArray = []
                for(var key in jsoned.hackers[0]){
                    if(key !== "admin" && key !== "password" && key !== "motivation" && key !== "skillDescription"){
                        panelArray.push({name:key,visible:true})
                    }
                     if(key !== "admin" && key !== "password" ){
                        rowArray.push({name:key,visible:true})
                    }
                }
                this.setState({
                    panelValues : panelArray,
                    attributeNames: rowArray,
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
        //var initialHackers = this.getHackers();
        return {
            panelValues:[],
            attributeNames: [],
            hackers: {},
            selectedParticipants: {}
        }
    },
    setAttributeNames: function(attributes){
        this.setState({
            panelValues: this.state.panelValues,
            attributeNames: attributes,
            hackers:this.state.hackers,
            selectedParticipants: this.state.selectedParticipants
        });
    },
    addToSelectedList: function(hacker) {
        var selected = this.state.selectedParticipants
        if(!selected[hacker.email]) {
            console.log("selected")
           selected[hacker.email] = hacker; 
        }
        this.setState({
                panelValues: this.state.panelValues,
                attributeNames: this.state.attributeNames,
                hackers: this.state.hackers,
                selectedParticipants: selected
        })
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

        var newArray = {}
            for(var key in this.state.attributeNames){
                if(this.state.attributeNames[key].visible){
                    newArray[this.state.attributeNames[key].name] = true;
                }
            }

    return (
    <div id="init">
        <SearchButton findHackers={this.acceptSelectedHackers}/>
        <ControlPanel
                setAttributeNames ={this.setAttributeNames}
                attributeNames={this.state.panelValues}
                findHackers={this.getHackers}
                selectedParticipants={this.state.selectedParticipants} 
        /> 
      <HackerTable 
            columnNames={newArray}
            hackers={this.state.hackers}
            addToSelectedList={this.addToSelectedList}
      />
      </div>
    )
    }
});