import React from "react";
import ControlPanel from "./ControlPanel";
import HackerTable from "./HackerTable";


export default React.createClass ({

    getHackers: function(){
            var xmlhttp = new XMLHttpRequest();
            var url = "http://localhost:3000/admin/hackers/all";
            xmlhttp.open('GET', url, false);
            xmlhttp.send();
            var responseItem = xmlhttp.response;
            var jsoned = JSON.parse(responseItem);
            
            var keyArray =[];
            for(var key in jsoned.hackers[0]){
                if(key !== "admin" && key !== "password"){
                    keyArray.push({name:key,visible:true});
                }
            }
            return{
                attributeNames: keyArray,
                hackers:(jsoned.hackers)
            };
        },
        
        getInitialState: function() {
            var initialHackers = this.getHackers();
            
            console.log(initialHackers);
            console.log("initialHackers");
            return {
                attributeNames: initialHackers.attributeNames,
                hackers: initialHackers.hackers
            };
        },

        setAttributeNames: function(attributes){
            this.setState({
                attributeNames: attributes,
                hackers:this.state.hackers
            });
        },

        setHackers: function(hackers){
            this.setState({
                attributeNames: this.state.attributeNames,
                hackers:hackers
            });
        },
    
    render: function() {
        
        var newArray = {}
        for(var key in this.state.attributeNames){
            if(this.state.attributeNames[key].visible){
                newArray[this.state.attributeNames[key].name] = true;
            }
        }
        console.log("NEW ARRAY");
        console.log(newArray);
        return (
            <div id="init">
              <ControlPanel
                        setAttributeNames ={this.setAttributeNames}
                        attributeNames={this.state.attributeNames}

                /> 
              <HackerTable 
                    columnNames={newArray}
                    hackers={this.state.hackers}
              />
              </div>
        )
    }
});