var $ = require ('jquery')
import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';



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
    return (
    <div id="init">
    <button onClick={this.getUsers}> Refresh</button>
      <Table
        rowsCount={this.state.myTableData.length}
        rowHeight={100}
        headerHeight={50}
        width={1400}
        height={500}>
        <Column
          header={<Cell>Name</Cell>}
          cell={
            <NameCell
              data={this.state.myTableData}
              field="name"
            />
          }
          width={200}
        />

          <Column
          header={<Cell>City</Cell>}
          cell={
            <TextCell
              data={this.state.myTableData}
              field="city"
            />
          }
          width={400}
        />
          <Column
          header={<Cell>Skillset</Cell>}
          cell={
            <SkillCell
              data={this.state.myTableData}
              field="skills"
            />
          }
          width={400}
        />

        <Column
          header={<Cell>email</Cell>}
          cell={
            <MyLinkCell
              data={this.state.myTableData}
              field="email"
            />
          }
          width={200}
        />
      
       
      </Table>
      </div>
    );
  }
}



















// var SortTypes = {
//   ASC: 'ASC',
//   DESC: 'DESC',
// };

// function reverseSortDirection(sortDir) {
//   return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
// }

// class SortHeaderCell extends React.Component {
//   constructor(props) {
//     super(props);

//     this._onSortChange = this._onSortChange.bind(this);
//   }

//   render() {
//     var {sortDir, children, ...props} = this.props;
//     return (
//       <Cell {...props}>
//         <a onClick={this._onSortChange}>
//           {children} {sortDir ? (sortDir === SortTypes.DESC ? '↓' : '↑') : ''}
//         </a>
//       </Cell>
//     );
//   }

//   _onSortChange(e) {
//     e.preventDefault();

//     if (this.props.onSortChange) {
//       this.props.onSortChange(
//         this.props.columnKey,
//         this.props.sortDir ?
//           reverseSortDirection(this.props.sortDir) :
//           SortTypes.DESC
//       );
//     }
//   }
// }

// const TextCell2 = ({rowIndex, data, columnKey, ...props}) => (
//   <Cell {...props}>
//     {data[rowIndex][columnKey]}
//   </Cell>
// );

// class DataListWrapper {
//   constructor(indexMap, data) {
//     this._indexMap = indexMap;
//     this._data = data;
//   }

//   getSize() {
//     return this._indexMap.length;
//   }

//   getObjectAt(index) {
//     return this._data.getObjectAt(
//       this._indexMap[index],
//     );
//   }
// }

// class PartnerPanel extends React.Component {
//   constructor(props) {
//     super(props);

//     this._dataList = [];

//     this._defaultSortIndexes = [];
//     var size = this._dataList.length;
//     for (var index = 0; index < size; index++) {
//       this._defaultSortIndexes.push(index);
//     }

//     this.state = {
//       sortedDataList: this._dataList,
//       colSortDirs: {},
//     };

//     this._onSortChange = this._onSortChange.bind(this);
//     this.getUsers = this.getUsers.bind(this);

//   }

//   componentDidMount() {
//     var that = this;
//     this.getUsers();
//   }

//  getUsers(){
//         var self = this;
//         var xhr = new XMLHttpRequest();

//         var url = "/partners/hackers/all"
//          // () => {   == same as function(){
//         xhr.onload = () => {
//           //request finished and response is ready  
//           if (xhr.readyState === 4) {

//             if (xhr.status === 200) {
//                 var responseItem = xhr.response
//                 var jsoned = JSON.parse(responseItem)
//                 console.log(jsoned)
                
//                 this.state = {
//                   sortedDataList: jsoned.hackers,
//                   colSortDirs: this.state.colSortDirs,
//                 };
//                 return jsoned.hackers;
            
//             } else {
//               console.error(xhr.statusText);

//             }
//           }
//         };
//         xhr.onerror = function (e) {
//           console.error(xhr.statusText);
//         };
//         xhr.open('GET', url);
//         xhr.send();
//     }


//   _onSortChange(columnKey, sortDir) {
//     var sortIndexes = this._defaultSortIndexes.slice();
//     sortIndexes.sort((indexA, indexB) => {
//       var valueA = this._dataList[(indexA)][columnKey];
//       var valueB = this._dataList[indexB][columnKey];
//       var sortVal = 0;
//       if (valueA > valueB) {
//         sortVal = 1;
//       }
//       if (valueA < valueB) {
//         sortVal = -1;
//       }
//       if (sortVal !== 0 && sortDir === SortTypes.ASC) {
//         sortVal = sortVal * -1;
//       }

//       return sortVal;
//     });

//     this.setState({
//       sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
//       colSortDirs: {
//         [columnKey]: sortDir,
//       },
//     });
//   }

//   render() {
//     var {sortedDataList, colSortDirs} = this.state;
//     return (
//         <div id="init">
//         <button onClick={this.getUsers}> Refresh</button>

//       <Table
//         rowHeight={50}
//         rowsCount={sortedDataList.length}
//         headerHeight={50}
//         width={1000}
//         height={500}
//         {...this.props}>
//         <Column
//           columnKey="id"
//           header={
//             <SortHeaderCell
//               onSortChange={this._onSortChange}
//               sortDir={colSortDirs.id}>
//               id
//             </SortHeaderCell>
//           }
//           cell={<TextCell2 data={sortedDataList} />}
//           width={100}
//         />
//         <Column
//           columnKey="firstname"
//           header={
//             <SortHeaderCell
//               onSortChange={this._onSortChange}
//               sortDir={colSortDirs.firstname}>
//               First Name
//             </SortHeaderCell>
//           }
//           cell={<TextCell2 data={sortedDataList} />}
//           width={200}
//         />
//         <Column
//           columnKey="lastname"
//           header={
//             <SortHeaderCell
//               onSortChange={this._onSortChange}
//               sortDir={colSortDirs.lastname}>
//               Last Name
//             </SortHeaderCell>
//           }
//           cell={<TextCell2 data={sortedDataList} />}
//           width={200}
//         />
//         <Column
//           columnKey="city"
//           header={
//             <SortHeaderCell
//               onSortChange={this._onSortChange}
//               sortDir={colSortDirs.city}>
//               City
//             </SortHeaderCell>
//           }
//           cell={<TextCell data={sortedDataList} />}
//           width={200}
//         />
//         <Column
//           columnKey="email"
//           header={
//             <SortHeaderCell
//               onSortChange={this._onSortChange}
//               sortDir={colSortDirs.email}>
//               Email
//             </SortHeaderCell>
//           }
//           cell={<TextCell data={sortedDataList} />}
//           width={200}
//         />
//       </Table>
//       </div>
//     );
//   }
// }



PartnerPanel.defaultProps = {
};

export default PartnerPanel;
