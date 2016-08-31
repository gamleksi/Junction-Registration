import React from "react";
import ReactDom from "react-dom";
import AdminPanel from "./ui-hackers/AdminPanel"

const app = document.getElementById('container');
ReactDom.render(<AdminPanel />, app)