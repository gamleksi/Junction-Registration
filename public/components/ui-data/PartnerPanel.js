var $ = require ('jquery')
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';

// in ECMAScript 6
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class NameCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell >
        {data[rowIndex].firstname +" "+ data[rowIndex].lastname }
      </Cell>
    );
  }
}

class MyLinkCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const link = data[rowIndex][field];
    return (
      <Cell >
        <a href={link}>{link}</a>
      </Cell>
    );
  }
}

class SkillCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    const skills = data[rowIndex]['skills'].replace("(","").replace(")","").replace(/,/g,", ")
    return (
      <Cell >
        {skills}
      </Cell>
    );
  }
}
class TextCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell >
        {data[rowIndex][field]}
      </Cell>
    );
  }
}


function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}


class PartnerPanel extends React.Component {



  constructor(props) {
    super(props);
  
    this.state = {
      myTableData: [
        {
            firstname:"Example Hacker",
            email:"example@hackjunction.com",
            skills:"node.js,tvOS"
        }
      ]
    };

    this.getUsers = this.getUsers.bind(this);

  }



  componentDidMount() {
    var that = this;
    this.getUsers();
  }

 

 getUsers(){
        var self = this;
        var xhr = new XMLHttpRequest();

        var url = "/partners/hackers/all"
         // () => {   == same as function(){
        xhr.onload = () => {
          //request finished and response is ready  
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
                var responseItem = xhr.response
                var jsoned = JSON.parse(responseItem)
                console.log(jsoned)
                this.setState({
                    myTableData:jsoned.hackers.hackers
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
    }



  render() {

    
// It's a data format example.
function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

    return (
       <BootstrapTable data={
        this.state.myTableData} 
        striped={true} 
        hover={true} 
        exportCSV 
        search
        pagination>
          <TableHeaderColumn dataField="firstname" isKey={true}  dataSort={true}>Firstname</TableHeaderColumn>
          <TableHeaderColumn dataField="lastname" dataSort={true}>Lastname</TableHeaderColumn>
          <TableHeaderColumn dataField="city" dataSort={true}>City</TableHeaderColumn>

          <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
        <TableHeaderColumn dataField="experience" dataSort={true}>Experience</TableHeaderColumn>
        <TableHeaderColumn dataField="skills" filter={ { type: 'TextFilter', delay: 500 } } >Skills</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}


PartnerPanel.defaultProps = {
};

export default PartnerPanel;
