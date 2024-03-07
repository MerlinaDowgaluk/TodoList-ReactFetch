//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import Layout from "./component/Layout.jsx";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
