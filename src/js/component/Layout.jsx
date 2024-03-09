import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
import { TodoListUsers } from "./TodoList-Users.jsx";
import Home from "../../img/home.jsx";


export const Layout = () =>{
        // The basename is used when your project is published in a subdirectory and not in the root of the domain
        // You can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
        const basename = "/" || "";
        //if (!process.env.BACKEND || process.env.BACKEND == "") return <BackendURL />;
    
        return (
            <div>
                {/* <BrowserRouter basename={basename}> */}
                <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<TodoListUsers />} path="/" />   
                        <Route element={<h1 className="text-center m-4">Not found!</h1>} path="*"/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
};
    
    
export default injectContext(Layout);
