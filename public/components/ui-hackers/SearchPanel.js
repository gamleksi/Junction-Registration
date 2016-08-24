import React from "react";


var SortRow = React.createClass({
    inputSelected: function(e) {
        this.props.sortSelected(e.target.value, this.props.key);
    },
    render() {
        return (
            <select class="col-sm-12" onChange={this.inputChanged} value={this.props.value}>
                {this.props.options}
            </select>
            )
    }
});


var FilterRow  = React.createClass({
    filterParamChanged: function(e) {
        this.props.textInputChanged(this.props.key, e.target.value);
    },
    filterTextChanged: function(e) {
        this.state.filterTextChanged(this.props.key, e.target.value);
    },
    render() {
        return (
            <div>
                <select class="col-sm-4" onChange={this.filterParamChanged} value={this.props.value.param}>
                    {this.props.options}
                </select>
              <input class="col-sm-8"
                type="text"
                value={this.props.text}
                onChange={this.filterTextChanged}
              />
            </div>
            )
    }
});

export default React.createClass({
    getInitialState: function() {
        return {
            filterParams: {0: {
                text: "Please Write something here!",
                param: "Select"
            }},
            sortBy: ["Select"]
        }
    },
    sortStateValues: [],
    filterStateValues: {},
    filterLastObjId: 0,
    searchWithSpecificParamas: function() {
        var filterParams = {}
        for(var key in this.filterStateValues) {
            var obj = this.filterStateValues[key];
            if(obj.param !== "Select") {
                filterParams[obj.param] = obj.text;
            }
        }
        if(this.sortStateValues[this.sortStateValues.length -1] === "Select") {
            this.sortStateValues.pop()
        }
        var query = {filterShow: filterParams, order: this.filterStateValues}
        this.props.searchSpecificHackers(query)
    },
    addSortRow: function() {
        this.sortStateValues.push("Select");
        this.setState({
            filterParams: this.state.filterParams,
            sortBy: this.sortStateValues
        })
    },
    addFilterRow: function() {
        this.filterLastObjId = this.filterLastObjId + 1
        this.filterStateValues[this.filterLastObjId] = {
            text: "Please Write something here!",
            param: "Select"
        };
        this.setState({
            filterParams: this.state.filterParams,
            sortBy: this.sortStateValues
        })
    },
    sortSelected: function(param, key) {
        this.sortStateValues[key] = param;
    },
    filterTextChanged: function(key, text) {
        this.filterStateValues[key]["text"] = text; 
    },
    filterParamChanged: function(key, param) {
        this.filterStateValues[key]["param"] = param; 
    },
    render:function(){


        var options = []
        for(var key in this.props.rowAttributes) {
            options.push(<option value={key}>{key}</option>)
        }

        var filterRows = []
        for(var key in this.state.filterParams) {
           filterRows.push(
            <FilterRow
                filterTextChanged={this.filterTextChanged}
                filterParamChanged={this.filterParamChanged}
                value={this.state.filterParams[key]}
                key={i}
                options={options}
            />)
        }        

        var sortRows = []
        for(var i in this.state.sortBy) {
           sortRows.push(
            <SortRow
              sortSelected={this.sortSelected}
              value={this.state.sortBy[i]}
                key={i}
                options={options}
            />)

        }      


        return(

            <div class="container">
                <h2>Search Fucker</h2>
                        <div class="search-row row">
                            <label class="col-sm-4">
                                Find By Params
                            </label>
                            <button class="col-sm-8" onClick={this.addFilterRow}>Add Row</button>
                            {filterRows}
                        </div>
                        <div class="search-row row">
                            <label class="col-sm-4">
                                Find By Params
                            </label>
                            <button class="col-sm-8" onClick={this.addSortRow}>Add Row</button>
                            {sortRows}
                        </div>
                <button onClick={this.searchWithSpecificParamas}>Search Hackers</button>
            </div>
            )
    }
});