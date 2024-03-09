import React, {useEffect, useState} from "react";
import Fondo from "../../img/10217044.jpg";

// 1º hay que crear el usuario
// 2º agregar tareas
// 3º mostrar tareas
// 4º eliminar usuario

export const TodoListUsers = () =>{
    const [ user, setUser] = useState("");
    const [ task, setTask] = useState("");
    const [ list, setList ] = useState([]);
    const [ login, setLogin ] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [ errorLogin, setErrorLogin ] = useState(false);


    const baseUrl = 'https://playground.4geeks.com/apis/fake/todos';

    const handleOnChange = () => {
		setIsChecked(!isChecked);
	};

    const handleOnSubmit = (event) =>{
        event.preventDefault();
        if (isChecked == false){
            getTodo();
        } else {
            createUser();
        }
    }

    const createUser = async () =>{
        const url = baseUrl + '/user/' + user;
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
            setLogin(true);
            getTodo()

        } else {
            setLogin(false);
            setErrorLogin(true);
            return ('Error: ', response.status, response.statusText)
        }
    }

    const getTodo = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "GET"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList(data);
            setLogin(true);

        } else {
            setLogin(false);
            setErrorLogin(true);
            return ('Error: ', response.status, response.statusText);
        }
    }

    const updateTask = async (newTask) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([...list, newTask])
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const addTask = (event) =>{
        event.preventDefault();
        if (task.trim() === ""){
            return
        };
        const newTask = {label: task, done: false};
        setList([...list, newTask]);
        updateTask(newTask);
        setTask("")
    }

    const taskDone = (item) =>{
        const newTaskDone = {label: item.label, done: true};
        const listWithoutDelete = list.filter((element, id) =>{
            if (item.id != id){
                return item != element;
            }
        });
        setList([...listWithoutDelete, newTaskDone]);
        actualiceTaskwithDelete(list);
    }

    const deleteUser = async () =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "DELETE"
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setList([]);
            setLogin(false);
            setErrorLogin(false)
        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }

    const deleteTask= (item) => {
        const listWithoutDelete = list.filter((element, id) =>{
            if (item.id != id){
                return item != element;
            }
        });
        console.log(listWithoutDelete);
        setList(listWithoutDelete);
        actualiceTaskwithDelete(listWithoutDelete)
    }

    const actualiceTaskwithDelete = async (listWithoutDelete) =>{
        const url = baseUrl + '/user/' + user;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(listWithoutDelete)
        };
        const response = await fetch(url, options);
        if (response.ok){
            const data = await response.json();
            console.log(data);

        } else {
            return ('Error: ', response.status, response.statusText)
        }
    }


    // useEffect(() =>{
    //     getTodo()
    // }, [])

    return(
        <div className="container">
            <h1 className="text-center m-2 mt-4 mb-5">ToDo List</h1>
            {login == false ?
            <div>
            <div className="m-3 justify-content-center">
            <div className="container col-6 card border border-4">
            <form onSubmit={handleOnSubmit}>
            <input type="text" className="form-control mt-3 mb-2" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Introduce tu nombre"></input>
            <div className="form-check text-start">
				<input type="checkbox" className="form-check-input" id="exampleCheck1" checked={isChecked} onChange={handleOnChange}></input>
				<label className="form-check-label" htmlFor="exampleCheck1">¿Nuevo usuario?</label>
			</div>
            <button type="submit" className="btn btn-success mt-2 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Guardar
            </button>
            </form>
            </div>
            </div>
            {errorLogin == true ?
            <div className="alert alert-warning d-block text-center" role="alert">
                Por favor, revisa los datos. Si es nuevo usuario, tienes que darle a check. Si eres usuario existente, no debes darle click.
            </div>
            :
            <div></div>
            }
            </div>
            :
            <div className="justify-content-center d-flex m-3">
            <h3 className="bg-light m-2 col-6 text-center border border-3 rounded-pill pt-3 pb-3">
                Usuario: {user}
            </h3>
            </div>
            }
            <div className="justify-content-center d-flex m-3">
            <button type="button" className="btn btn-warning m-2 col-2" onClick={getTodo}> 
                Obtener ToDos
            </button>
            <button type="button" className="btn btn-danger m-2 col-2" onClick={deleteUser}>
                Eliminar usuario
            </button>
            </div>
            <div className="container col-6">
            <div className="mb-3 justify-content-center">
                <form onSubmit={addTask} >
                    <input className="form-control border border-4" placeholder="Agrega una tarea" type="tet" value={task} onChange={(e) =>{setTask(e.target.value);}}/>
                </form>
            </div>
            <div className="list justify-content-center">
                <ul className="list-group "> 
                    {list.map((item, index) => {
                        return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon border border-bottom-0 border-4">
                            {item.label}: {item.done ? 'Terminado' : 'Pendiente'}
                            <div className="justify-content-end">
                            <span onClick={() => {taskDone(item)}} className={item.done ? "disabled" : " "} aria-disabled={item.done ? "true" : "false"}><i className={item.done ? "disabled" : "fas fa-solid fa-check m-1 text-success"}></i></span>
                            <span key={index} onClick={() => {deleteTask(item)}}><i className="far fa-trash-alt text-danger m-1"></i></span>
                            </div>
                        </li>
                    })}
                    <span className="list-group-item bg-light text-end fw-lighter border-4 border">
                        {list.length === 0 ? "No hay tareas." : list.length + " tareas."}
                    </span>
                </ul>
            </div>
            </div>
        </div>
    )
}