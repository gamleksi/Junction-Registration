var $ = require ('jquery')
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';

// in ECMAScript 6
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


 

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}



const qualityType = {
        '':'All',
      '< 1 Year': '< 1 Year',
      '1-2 Years': '1-2 Years',
      '3-5 Years': '3-5 Years',
      '5+ Years': '5+ Years'
    };



class PartnerPanel extends React.Component {



  constructor(props) {
    super(props);
  
    this.state = {
      myTableData: []
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


      handlerClickCleanFiltered() {
        this.refs.skills.cleanFiltered();
        this.refs.experience.cleanFiltered();
        this.refs.school.cleanFiltered();
        
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
        search>
        <TableHeaderColumn dataField="firstname" isKey={true}  dataSort={true}>
            Firstname
          <br/><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer' } }>clear filters</a>
        </TableHeaderColumn>
        <TableHeaderColumn dataField="lastname" dataSort={true}>Lastname</TableHeaderColumn>
        <TableHeaderColumn dataField="countryFrom" dataSort={true}>Country from</TableHeaderColumn>
        <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
        <TableHeaderColumn ref="school" filter={ { type: 'TextFilter', delay: 500 } }  dataField="school" dataSort={true}>School</TableHeaderColumn>
        <TableHeaderColumn ref="experience" dataField="experience" filter={ { type: 'SelectFilter', options: qualityType } } dataFormat={ enumFormatter } formatExtraData={ qualityType }>Experience</TableHeaderColumn>
        <TableHeaderColumn ref="skills" dataField="skills" filter={ { type: 'TextFilter', delay: 500 } } >Skills</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}


PartnerPanel.defaultProps = {
};

export default PartnerPanel;
