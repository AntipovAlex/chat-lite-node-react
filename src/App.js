import React, {useReducer, useEffect} from 'react';
import JoinBlock from "./component/JoinBlock";
import reducer from "./reducer";
import socket from "./socket";
import Chat from "./component/Chat";
import axios from "axios";


function App() {
    const [state, dispatch] = useReducer(reducer, {
        isAuth: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'IS_AUTH',
            payload: obj
        });
        socket.emit('ROOM:JOIN', obj);
        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        dispatch({
            type: "SET_DATA",
            payload: data
        })
    };
    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }
    const addMessage =(message) =>{
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        })
    }
    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE',addMessage)
    }, [])

    return (
        <div className="wrapper">
            <h2>Hello React</h2>
            {!state.isAuth ? <JoinBlock onLogin={onLogin}/>
            : <Chat {...state} onAddMessage ={addMessage}/>}
        </div>
    );
}

export default App;
