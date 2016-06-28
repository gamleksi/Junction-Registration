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
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                
                var keyArray =[]
                for(var key in jsoned.hackers[0]){
                    if(key !== "admin" && key !== "password"){
                        keyArray.push({name:key,visible:true})
                    }
                }
                self.setState({
                    attributeNames: keyArray,
                    hackers:(jsoned.hackers)
                });
                console.log(jsoned.hackers)
                console.log("jsoned.hackers")
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
        // var responseItem = xmlhttp.response
        // var jsoned = JSON.parse(responseItem)
        
        // var keyArray =[]
        // for(var key in jsoned.hackers[0]){
        //  if(key !== "admin" && key !== "password"){
        //      keyArray.push({name:key,visible:true})
        //  }
        // }
        // this.setState({
        //  attributeNames: keyArray,
        //  hackers:(jsoned.hackers)
        // });
    },
    
        // xhr.open('GET', url,true);
        // xhr.send(null);
    getInitialState: function() {
        //var initialHackers = this.getHackers();
        return {
            attributeNames: [],
            hackers: {}
        }
    },
    setAttributeNames: function(attributes){
        this.setState({
            attributeNames: attributes,
            hackers:this.state.hackers
        });
    },setHackers: function(hackers){
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

    return (
    <div id="init">
        <SearchButton findHackers={this.getHackers}/>
      <ControlPanel
                setAttributeNames ={this.setAttributeNames}
                attributeNames={this.state.attributeNames}
                findHackers={this.getHackers}
        /> 
      <HackerTable 
            columnNames={newArray}
            hackers={this.state.hackers}
      />
      </div>
    )
    }
});