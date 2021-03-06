import React, {useState} from 'react';
import axios from "axios";

const JoinBlock = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const Enter = async () => {
        if (!userName) {
            return alert('Please, enter name!')
        }
        if (!roomId) {
            return alert('Please, enter roomId!')
        }
        const obj ={
            roomId,
            userName
        }
        setIsLoading(true);
        await axios.post('/rooms', obj);
        onLogin(obj);
    }
    return (
        <div>
            <input type="text" placeholder='Room id' value={roomId} onChange={e => setRoomId(e.target.value)}/>
            <input type="text" placeholder='User name' value={userName} onChange={e => setUserName(e.target.value)}/>
            <button disabled={isLoading} onClick={Enter} className="btn btn-success">{isLoading ? 'OPEN...' : 'Open'}</button>
        </div>
    );
};

export default JoinBlock;
