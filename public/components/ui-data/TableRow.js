import React from "react";


var reimburesements = ["Select", "No", "Fin", "Nord", "Eu", "Out"];

var RadioInputs =  React.createClass({

    inputSelected: function(e) {
        this.props.inputSelected(e.target.value);
    },
    render: function(){
        var options =[];
        var travelReimbursement = this.props.travelReimbursement

        if(!travelReimbursement) {

            travelReimbursement = reimburesements[0]
        } 
        for(var i in reimburesements) {
            options.push(<option value={reimburesements[i]}>{reimburesements[i]}</option>)
        }
        return (

           <select onChange={this.inputSelected} value={travelReimbursement}>
            {options}
           </select>

        )
    }
});

var ExpandedRadioInput = React.createClass({

    inputSelected: function(e) {
        this.props.inputSelected(e.target.value);
    },
    render: function(){
        var travelReimbursement = this.props.travelReimbursement
        if(!travelReimbursement) {
            travelReimbursement = reimburesements[0];
        }
        var radioInputs = []
        for(var i in reimburesements) {

                radioInputs.push(
                <div class="radio">
                    <label>
                    <input
                        checked={reimburesements[i] === travelReimbursement}
                        value={reimburesements[i]}
                        onChange={this.inputSelected}
                        type="radio" 
                        name={this.props.hackerId}/>
                    {reimburesements[i]}    
                    </label>
                </div>
                )
        }
        return (
            <div>
                {radioInputs}
            </div>
        )
    }
});

var ModificationInput = React.createClass({
    getInitialState: function() {
        return {
            attributeValue: this.props.attributeValue  
        }
    },
    inputChanged: function(e) {
        this.setState({
            attributeValue: e.target.value,
        })
        this.props.inputChanged(this.props.attributeKey, e.target.value);
    },    
    render: function(){
        
        var type = typeof this.props.attributeValue;

        return(
            <div class="modified">
                <p><b>{this.props.attributeKey}:</b></p>
                <input
                    type={type}
                    value={this.state.attributeValue}
                    onChange={this.inputChanged}/>
            </div>        
        )
    }
})

var ExpandedInfo = React.createClass({
    
    hacker: {},
    originalHacker: {},
    getInitialState: function(){
        return {
            modified: false,
            alert: false
        }   
    },
    inputChanged: function(key, input){
        this.hacker[key] = input;             
    },
    updateHackerObj: function() {
        for(var key in this.originalHacker) {
            this.hacker[key] = this.originalHacker[key]
        }
    },
    modificationClicked: function() {
        if(this.modified) {
            this.updateHackerObj();
        }        
        this.setState({
            modified: !this.state.modified,
            alert: false
        })
    },
    saveModifications: function() {
        var hacker = this.hacker;
        var self = this;
        this.hacker = {}
        this.originalHacker = {}
        this.props.saveModifications(hacker, function(result) {
            if(!result) {
                self.originalHacker = self.props.hackerInfo;     
                self.updateHackerObj()
            }
            self.setState({
                modified: false,
                alert: !result,
            })
        });
    },
    valuesDiffer: function(hacker){
        var r = false;
        for(var key in this.originalHacker) {
            if(this.originalHacker[key] !== hacker[key]) {
                r = true
            }
        }
        return r;
    },
    render: function(){
        var self = this;
        if(self.originalHacker.email === undefined || self.valuesDiffer(self.props.hackerInfo) || self.valuesDiffer(self.hacker)) {
            self.originalHacker = self.props.hackerInfo;     
            self.updateHackerObj()
        }

        var columns = [];
        var radioInputs = undefined;

        for(var key in this.hacker){
            var modificationClicked
            if(key === "travelReimbursement" && (!this.hacker[key] || !this.hacker["accepted"])) {
                radioInputs = <ExpandedRadioInput inputSelected={this.props.inputSelected} travelReimbursement={this.hacker.travelReimbursement} hackerId={this.hacker.email}/>;
            } else {
                var bool = true;
                this.props.expandedInfo.forEach(function(value) {
                    if(key === value) {
                        bool = false;
                    }
                })
                if(key === "admin" || key === "password") {
                    bool = false;
                }
                if(bool) {
                    var value = this.hacker[key];
                    if(this.state.modified && key!=="email") {
                        columns.push(<ModificationInput
                                attributeKey={key}
                                attributeValue={value}
                                inputChanged={this.inputChanged}
                            />)
                    } else {
                        columns.push(
                            <div class="modified">
                                <p key={key+value}> <b> {key + ":"} </b></p>
                                <p class="content" key={key+value+"text"}>{value}</p>
                            </div>);
                    }
                }
            }             

        }        

        var divStyle = {};

        if(this.state.alert) {
            divStyle['color'] = 'red';
        }

        var modText = "MODIFY"
        var saveButton = "";
        if(this.state.modified) {
            modText = "CANCEL"
            saveButton = <button class="expand" onClick={this.saveModifications}>SAVE</button>;            
        }

        var sections = [[], [], []]
        var third = columns.length/3;
        for(var index in columns) {
            if(index < third) {
                sections[0].push(columns[index])
            } else if(index < third*2) {
                sections[1].push(columns[index])
            } else {
                sections[2].push(columns[index])
            }
        }        

        var textColums = [];
        this.props.expandedInfo.forEach(function(key) {
                    textColums.push(
                            <p key={key}><b> {key + ":"}</b> {self.hacker[key]}</p>                    
                        )                
        }) 

        var classColor="active";
        if(this.props.hackerInfo.travelReimbursement) {
            classColor="success"
        }

        return(
            <tr  class={"expand-view " + classColor} style={divStyle}>
                    <td>
                        {sections[0]}
                    </td>
                    <td>
                        {sections[1]}
                    </td>
                    <td>
                        {sections[2]}
                    </td>                                        
                    <td>
                        {textColums}
                    </td>
                    <td>                            
                        <button class="expand" onClick={this.props.expandClick}>COLLAPSE</button>
                        <button class="expand" onClick={this.modificationClicked}>{modText}</button>
                        {saveButton}
                        <div>
                            {radioInputs}
                        </div>
                    </td>                      
            </tr>
        )            
    }
})

var RowInfo = React.createClass({

    render: function() {
        var values = []
        for(var key in this.props.hackerInfo){
            if(this.props.visibleColumns[key]) {
                if(key === "travelReimbursement" && (!this.props.hackerInfo[key] || this.props.hackerInfo[key] === "Select" || !this.props.hackerInfo["accepted"])) {
                    values.push(<td class="row" style={this.props.tdRowStyle}><RadioInputs inputSelected={this.props.inputSelected} travelReimbursement={this.props.hackerInfo["travelReimbursement"]} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/></td>)
                } else {
                    var value = this.props.hackerInfo[key]
                    values.push(<td class="row" style={this.props.tdRowStyle} key={key+value}><p>{value}</p></td>)
                }
            }
        }

        var classColor="active"
        if(this.props.hackerInfo.travelReimbursement) {
            classColor="success"
        }
        var buttonStyle = this.props.tdRowStyle
        buttonStyle["align"] = "right"
        return(            

            <tr  class={classColor} >
                {values}
                <td class="row" style={this.props.tdRowStyle}>
                        <button onClick={this.props.expandClick}>EXPAND</button>                        
                </td>
            </tr>
            )        
    }
})



export default React.createClass({
    getInitialState:function(){
        return {
            expand: false,
        }
    },
    expandClick: function(){
        this.setState({
            expand: !(this.state.expand),
        })
    },
    inputSelected: function(travelReimbursement) {

        if(travelReimbursement === "Select") {
            this.props.dropFromSelectedList(this.props.hackerInfo);          
        } else {
            this.props.addToSelectedList(this.props.hackerInfo, travelReimbursement);
        }
    },

    
    render: function() {

        if(this.state.expand) {
            return (
                <ExpandedInfo
                    saveModifications={this.props.hackerModificationSaved}
                    hackerInfo={this.props.hackerInfo}
                    selectClick={this.selectClick}
                    expandClick={this.expandClick}
                    visibleColumns={this.props.visibleColumns}
                    inputSelected={this.inputSelected}
                    expandedInfo={this.props.expandedInfo}
                />
            )
        } else {
            return (
                <RowInfo
                    tdRowStyle={this.props.tdRowStyle}
                    visibleColumns={this.props.visibleColumns}
                    hackerInfo={this.props.hackerInfo}
                    selectClick={this.selectClick}
                    expandClick={this.expandClick}
                    inputSelected={this.inputSelected}
                />
            )
        }
    }

})
