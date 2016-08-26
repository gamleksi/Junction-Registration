import React from "react";


var SortRow = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },    
    inputChanged: function(e) {
        this.props.sortSelected(e.target.value, this.props.index);
        this.setState({
            value: e.target.value
        })
    },
    render() {
        return (
            <select class="col-sm-12" onChange={this.inputChanged} value={this.state.value}>
                {this.props.options}
            </select>
            )
    }
});

var FilterRow  = React.createClass({
    getInitialState: function() {
        return {
            param: this.props.obj.param,
            text: this.props.obj.text
        }
    },    
    filterParamChanged: function(e) {
        this.setState({
            param: e.target.value,
            text: this.state.text
        })
        this.props.filterParamChanged(this.props.index, e.target.value);
    },
    filterTextChanged: function(e) {
        this.setState({
            text: e.target.value,
            param: this.state.param
        })
        this.props.filterTextChanged(this.props.index, e.target.value);
    },
    render() {
        console.log("render() { " + this.props)
        console.log("render() { " + this.props.index)
        return (
            <div>
                <select class="col-sm-4" onChange={this.filterParamChanged} value={this.state.param}>
                    {this.props.options}
                </select>
              <input class="col-sm-8"
                type="text"
                value={this.state.text}
                onChange={this.filterTextChanged}
              />
            </div>
            )
    }
});

export default React.createClass({
    sortStateValues: [],
    filterStateValues: {},    
    getInitialState: function() {
        return {
            filterParams: this.filterStateValues,
            sortBy: this.sortStateValues
        }
    },
    filterLastObjId: -1,
    searchWithSpecificParamas: function() {
        var filterParams = {}
        for(var key in this.filterStateValues) {
            var obj = this.filterStateValues[key];
            if(obj.param !== "Select") {
                filterParams[obj.param] = obj.text;
            }
        }
        console.log("this.sortStateValues" + this.sortStateValues)
        if(this.sortStateValues[this.sortStateValues.length -1] === "Select") {
            this.sortStateValues.pop()
        }
        var query = {filterShow: filterParams, sortBy: this.sortStateValues}
        this.props.searchSpecificHackers(query)
    },
    emptySearch: function() {
        this.filterLastObjId = -1;
        this.sortStateValues = [];
        this.filterStateValues = {},
        this.setState({
            sortBy: this.sortStateValues,
            filterParams: this.filterStateValues         
        })
    },
    addSortRow: function() {
        this.sortStateValues.push("Select");
        this.setState({
            filterParams: this.filterStateValues,
            sortBy: this.sortStateValues
        })
    },
    addFilterRow: function() {
        this.filterLastObjId = this.filterLastObjId + 1;
        this.filterStateValues[this.filterLastObjId] = {
            text: "",
            param: "Select"
        };
        this.setState({
            filterParams: this.filterStateValues,
            sortBy: this.sortStateValues
        })
    },
    sortSelected: function(param, key) {
        console.log(key);
        if(this.sortStateValues[key] !== undefined) {
         this.sortStateValues[key] = param;  
        }
        console.log("this.sortStateValues[key] " + this.sortStateValues)
    },
    filterTextChanged: function(key, text) {

        this.filterStateValues[key]["text"] = text; 
    },
    filterParamChanged: function(key, param) {

        this.filterStateValues[key]["param"] = param; 
    },
    render:function(){
        var options = [<option key={"Select"} value={"Select"}>Select</option>]
        for(var key in this.props.rowAttributes) {
            options.push(<option key={key} value={key}>{key}</option>)
        }

        var filterRows = []
        var arr = Object.keys(this.state.filterParams);
        for(var index in arr) {
            console.log(this.state.filterParams)
            console.log("index" + this.state.filterParams[index].param + " " + this.state.filterParams[index].text)
           filterRows.push(
            <FilterRow
                filterTextChanged={this.filterTextChanged}
                filterParamChanged={this.filterParamChanged}
                obj={this.state.filterParams[index]}
                index={index}
                options={options}
            />)
        }        

        var sortRows = []
        for(var i in this.state.sortBy) {
            console.log(" var sortRows = [] " + i)
           sortRows.push(
            <SortRow
              sortSelected={this.sortSelected}
              value={this.state.sortBy[i]}
                index={i}
                options={options}
            />)

        }      


        return(

            <div class="container">
                <h2>Search Fucker</h2>
                        <div class="search-row row">
                            <label class="col-sm-4">
                                Search with specific parameters 
                            </label>
                            <button class="col-sm-8" onClick={this.addFilterRow}>Add Row</button>
                            {filterRows}
                        </div>
                        <div class="search-row row">
                            <label class="col-sm-4">
                                Sort data
                            </label>
                            <button class="col-sm-8" onClick={this.addSortRow}>Add Row</button>
                            {sortRows}
                        </div>
                <button onClick={this.searchWithSpecificParamas}>Search Hackers</button>
                <button onClick={this.emptySearch}>Empty Search</button>
            </div>
            )
    }
});