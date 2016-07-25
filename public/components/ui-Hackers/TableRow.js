import React from "react";


var RadioInputs =  React.createClass({

    inputSelected: function(e) {
        this.props.inputSelected(e.target.value);
    },
    render: function(){
        return (
            // <div>
            //     <td class="radio-inline">
            //         <p>No</p>
            //         <input
            //             value="No"
            //             onInput={this.inputSelected}
            //             type="radio" 
            //             name={this.props.hackerId}/>
            //     </td>
            //     <td class="radio-inline">
            //         <p>Fin</p>
            //         <input
            //             value="Fin"

            //             onInput={this.inputSelected}
            //             type="radio" 
            //             name={this.props.hackerId}/>
            //     </td>
            //     <td class="radio-inline">
            //         <p>Eu</p>
            //         <input
            //             value="Eu"
            //             onInput={this.inputSelected}
            //             type="radio" 
            //             name={this.props.hackerId}/>
            //     </td>
            //     <td class="radio-inline">
            //         <p>Out</p>
            //         <input
            //             value="Out"
            //             onInput={this.inputSelected}
            //             type="radio" 
            //             name={this.props.hackerId}/>
            //     </td>
            // </div>
               <div class="dropdown">
                   <select onChange={this.inputSelected} value={this.props.travelReImbursement}>
                      <option value="select">Select</option>
                      <option value="No">No</option>                  
                      <option value="Fin">Fin</option>
                      <option value="Nord">Nord</option>
                      <option value="Eu">Eu</option>
                      <option value="Out">Out</option>
                   </select>

               </div>
        )
    }
});

var ExpandedRadioInput = React.createClass({

    inputSelected: function(e) {
        console.log(e.target.value)
        this.props.inputSelected(e.target.value);
    },
    render: function(){
        var reimburesements = ["No", "Fin", "Nord", "Eu", "Out"];
        var radioInputs = []
        for(var i in reimburesements) {
                radioInputs.push(
                <div class="radio">
                    <label>
                    <input
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
            for(var key in this.props.hackerInfo){
                if(this.props.visibleColumns.hasOwnProperty(key)) {
                    var value = hacker[key]
                    column1.push(<p key={value}> <b> {key + ":"} </b> {value}</p>)
                }
            }


        var textColums = []; //Motivation, skillDescription etc

        this.props.expandedInfo.forEach(function(key) {
            console.log(key)
            textColums.push(
                <td>
                    <b> {key + ":"} + </b> {hacker[key]}                    
                </td>
                )
        })

        var classColor="active"
        if(this.props.selected) {
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
                            <ExpandedRadioInput inputSelected={this.props.inputSelected} travelReImbursement={this.props.travelReImbursement} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/>                            
                            <button onClick={this.props.selectClick}>SELECT</button>
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
                    values.push(<td class="row"><RadioInputs inputSelected={this.props.inputSelected} travelReImbursement={this.props.travelReImbursement} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/></td>)
                } else {
                    var value = this.props.hackerInfo[key]
                    values.push(<td class="row" style={this.props.tdRowStyle} key={value}><p>{value}</p></td>)
                }
            }
        }

        var classColor="active"
        if(this.props.selected) {
            classColor="success"
        }
        var buttonStyle = this.props.tdRowStyle
        buttonStyle["align"] = "right"
        return(            

            <tr  class={classColor} >
                {values}
                <td class="row" style={buttonStyle}>
                    <div>
                        <button onClick={this.props.expandClick}>EXPAND</button> 
                        <button onClick={this.props.selectClick}>SELECT</button>
                       
                    </div>
                </td>
            </tr>
            )        
    }
})



export default React.createClass({
    getInitialState:function(){
        return {
            expand: false,
            selected: false,            
            travelReImbursement: "select"
        }
    },
    expandClick: function(){
        console.log("Expand clicked")
        this.setState({
            expand: !(this.state.expand),
            selected: this.state.selected,
            travelReImbursement: this.state.travelReImbursement
        })
    },
    selectClick: function(){
        //unselect
        if(this.state.selected) {
            this.props.dropFromSelectedList(this.props.hackerInfo);
            this.setState({
                expand: this.state.expand,
                selected: !(this.state.selected),
                travelReImbursement: this.state.travelReImbursement
            })            
        } else if(this.state.travelReImbursement !== "select") {
            this.setState({
                expand: this.state.expand,
                selected: true,
                travelReImbursement: this.state.travelReImbursement
            })
            this.props.addToSelectedList(this.props.hackerInfo, this.state.travelReImbursement);
        }
    },
    inputSelected: function(travelReImbursement) {
        this.setState({
            expand: this.state.expand,
            selected: this.state.selected,
            travelReImbursement: travelReImbursement
        })
    },

    
    render: function() {
        if(this.state.expand) {
            return (
                <ExpandedInfo
                    travelReImbursement={this.state.travelReImbursement}
                    selected={this.state.selected}
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
                    travelReImbursement={this.state.travelReImbursement}
                    selected={this.state.selected}
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
