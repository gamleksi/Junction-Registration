import React from "react";
import TableRow from "./TableRow";
import PartnerTableRow from "./PartnerTableRow"

export default React.createClass({
    
    render:function(){

        var rows = []
        if(this.props.partnerPanel) {

             for(var i in this.props.hackers){
                var hacker = this.props.hackers[i]          
                rows.push(
                    <PartnerTableRow
                        hackerModificationSaved={this.props.hackerModificationSaved}
                        tdRowStyle={this.props.tdRowStyle}                
                        dropFromSelectedList={this.props.dropFromSelectedList}
                        addToSelectedList={this.props.addToSelectedList}
                        visibleColumns={this.props.rowAttributes}
                        hackerInfo={hacker}
                        expandedInfo={this.props.expandedInfo}
                        />
                    )
            }           
        } else {
            for(var i in this.props.hackers){
                var hacker = this.props.hackers[i]          
                rows.push(
                    <TableRow
                        hackerModificationSaved={this.props.hackerModificationSaved}
                        tdRowStyle={this.props.tdRowStyle}                
                        dropFromSelectedList={this.props.dropFromSelectedList}
                        addToSelectedList={this.props.addToSelectedList}
                        visibleColumns={this.props.rowAttributes}
                        hackerInfo={hacker}
                        expandedInfo={this.props.expandedInfo}
                        />
                    )
            }
        }
        return(
            <tbody>
             
                {rows}
            </tbody>
            )
    }
});