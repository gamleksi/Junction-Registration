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
            <td>
               <div class="dropdown">
                   <select id="lang" onChange={this.inputSelected} value={this.props.travelReImbursement}>
                      <option value="select">Select</option>
                      <option value="No">No</option>                  
                      <option value="Fin">Fin</option>
                      <option value="Nord">Nord</option>
                      <option value="Eu">Eu</option>
                      <option value="Out">Out</option>
                   </select>

               </div>
            </td>
        )
    }
});


var ExpandedInfo = React.createClass({

    
    render: function(){
        var values = []
        var values2 = []
        console.log("this.props.visibleColumns")
        console.log(this.props.visibleColumns) 
            for(var key in this.props.hackerInfo){
                if(key !=="motivation" && key !== "skillDescription"){
                    if(this.props.visibleColumns[key]) {
                        var value = this.props.hackerInfo[key]
                        values.push(<p key={value}>{value}</p>)
                    }
                } else {
                    if(this.props.visibleColumns[key]) {
                        var value = this.props.hackerInfo[key]
                        values2.push(<p key={value}><b>{key}</b><br/><br/><br/>{value}</p>)
                    }
                }
            }
        var classColor="active"
        if(this.props.selected) {
            classColor="success"
        }

        return(
            <tr  class={classColor} height="300" >
                    <td>
                        <div>
                            {values}
                        </div>
                    </td>
                      <td>
                        <div>
                            {values2}
                        </div>
                    </td>
                    <RadioInputs inputSelected={this.props.inputSelected} travelReImbursement={this.props.travelReImbursement} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/>
                    <td>
                        <div>
                            <button onClick={this.props.expandClick}>EXPAND</button>
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
            if(key !=="motivation" && key !== "skillDescription"){
                if(this.props.visibleColumns[key]) {
                    var value = this.props.hackerInfo[key]
                    values.push(<td key={value}>{value}</td>)
                }
            }
        }        

        var classColor="active"
        if(this.props.selected) {
            classColor="success"
        }

        return(            

            <tr  class={classColor} >
                {values}
                <RadioInputs inputSelected={this.props.inputSelected} travelReImbursement={this.props.travelReImbursement} inputChanged={this.inputChanged} hackerId={this.props.hackerInfo.email}/>
                <td>
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
                />
            )
        } else {
            return (
                <RowInfo
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
