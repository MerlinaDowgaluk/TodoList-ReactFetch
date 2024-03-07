import React, { useState } from "react";
import { TodoListUsers } from "./TodoList-Users.jsx";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

//create your first component
const Home = () => {
	const [ user, setUser ] = useState("")
	const baseUrl = 'https://playground.4geeks.com/apis/fake/todos';
	const navigate = useNavigate();

	const handleOnSubmit = (event) =>{
		event.preventDefault();
		handleUser()
	}

	const handleUser = async() =>{
		const url = baseUrl + "/user/" + user;
		const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([])
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
			navigate('/todo-list')
        } else {
            return ('Error: ', response.status, response.statusText)
        }
	}

	return (
		<div className="container">
			<h1 className="text-center m-2 mt-5">Ingresa tu nombre</h1>
			<form onSubmit={handleOnSubmit}>
				<label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
				<input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
				value={user} onChange={(e) => setUser(e.target.value)} required></input>
				<button to="/todo-list" type="submit" className="btn btn-primary btn-lg" >Continuar</button>
			</form>
		</div>
	);
};

export default Home;
