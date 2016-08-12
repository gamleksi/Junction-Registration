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

var ExpandedInfo = React.createClass({

    
    render: function(){
        var hacker = this.props.hackerInfo
        var column1 = []
        var radioInputs = undefined

        for(var key in this.props.hackerInfo){

            if(key === "travelReimbursement" && (!this.props.hackerInfo[key] || !this.props.hackerInfo["accepted"])) {
                radioInputs = <ExpandedRadioInput inputSelected={this.props.inputSelected} travelReimbursement={this.props.hackerInfo.travelReimbursement} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/>;
            } else {
                if(!this.props.expandedInfo[key]) {
                    var value = hacker[key]
                    column1.push(<p key={key+value}> <b> {key + ":"} </b> {value}</p>)
                }
            }                


        }

        var textColums = []; //Motivation, skillDescription etc
    
        this.props.expandedInfo.forEach(function(key) {
                textColums.push(
                    <td>
                        <b> {key + ":"} + </b> {hacker[key]}                    
                    </td>
                    )                
        })

        var classColor="active"
        if(this.props.hackerInfo.travelReimbursement) {
            classColor="success"
        }

        return(
            <tr  class={classColor}>
                    <td>
                        {column1}
                    </td>
                    {textColums}
                    <td>                            
                        <button class="expand" onClick={this.props.expandClick}>COLLAPSE</button>

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
                if(key === "travelReimbursement" && (!this.props.hackerInfo[key] || !this.props.hackerInfo["accepted"])) {
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
        console.log("travelReimbursement");
        console.log(travelReimbursement);
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
