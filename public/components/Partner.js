import React from "react";
import ReactDom from "react-dom";
import AdminPanel from "./ui-data/AdminPanel"
import PartnerPanel from "./ui-data/PartnerPanel"

const partner = document.getElementById('partnerContainer');
var partnerPanel = true;
ReactDom.render(<PartnerPanel 
	partnerPanel={partnerPanel}
	/>, partner)
