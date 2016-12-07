import React from 'react';
import ReactDOM from 'react-dom';


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
const trackType = {
    "gaming":" Gaming",
    "adtech":" Adtech",
    "vr":" Virtual Reality",
    "iot":" IoT",
    "dataDriven" :" Data Driven Economy",
    "fintech" :" Fintech",
    "ai" :" Artificial Intelligence",
    "healthtech" :" Healthtech",
    "buildings" :" Intelligent Buildings",
    "ecommerce" :" E-Commerce",
    "mobility" :" Future Mobility" 

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
                console.log(jsoned.hackers.hackers)
                var skills = jsoned.hackers.hackers.skills
                console.log(skills)
                jsoned.hackers.hackers.forEach(function(hacker){
                    hacker["skills"] = hacker["skills"].replace(/\(|\)/g, "").replace(/,/g,", ").replace(/"/g,"'");
                    hacker["name"] = hacker["firstname"]+ " " +hacker["lastname"];
                })
                
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
        this.refs.tracks.cleanFiltered();
        
      }


    
// It's a data format example.
 priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}
    
     createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>That is my custom header</h3>
        <button className='btn btn-info' onClick={ onClose }>Close it!</button>
      </div>
    );
  }

   

  render() {

     const options = {
        sizePerPage: 10,
        exportCSVText: 'Export current hackers to CSV'
      };
    
    return (
    <div>
    <br/><a onClick={ this.handlerClickCleanFiltered.bind(this) } style={ { cursor: 'pointer'} } >CLEAR FILTERS</a>
       <BootstrapTable data={
        this.state.myTableData} 
        striped={true} 
        hover={true} 
        options={options}
        exportCSV
        search
        pagination
        striped
        csvFileName='junction_hackers'
        >
        <TableHeaderColumn dataField="name" isKey={true}  dataSort={true}>
            Name
       
        </TableHeaderColumn>
        <TableHeaderColumn dataField="countryFrom" columnClassName='td-column-string-example' dataSort={true}>🌍</TableHeaderColumn>
        <TableHeaderColumn ref="experience" dataField="experience" filter={ { type: 'SelectFilter', options: qualityType } } dataFormat={ enumFormatter } formatExtraData={ qualityType }>Experience</TableHeaderColumn>
        <TableHeaderColumn ref="skills" dataField="skills" filter={ { type: 'TextFilter', delay: 500 } } >Skills</TableHeaderColumn>
        <TableHeaderColumn ref="school" filter={ { type: 'TextFilter', delay: 500 } }  dataField="school" dataSort={true}>School</TableHeaderColumn>
        <TableHeaderColumn ref="track" dataField="track" filter={ { type: 'SelectFilter', options: trackType } } dataFormat={ enumFormatter } formatExtraData={ trackType }>Track</TableHeaderColumn>

        <TableHeaderColumn dataField="portfolio" dataSort={true}>Portfolio</TableHeaderColumn>

        <TableHeaderColumn dataField="email" dataSort={true}>Email</TableHeaderColumn>
        
      </BootstrapTable>
      </div>
    );
  }
}


PartnerPanel.defaultProps = {
};

export default PartnerPanel;
