import React, {useState, useRef, useEffect} from 'react';
import socket from "../socket";

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {
    const [message, setMessage] = useState('');
    const messageRef = useRef(null)

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: message
        })
        onAddMessage({
            userName,
            text: message
        })
        setMessage('');
    }

    useEffect(() => {
        messageRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className="chat">
            <div className="chat-users">
                Комната: <b>{roomId}</b>
                <hr />
                <b>Онлайн ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messageRef} className="messages">
                    {messages.map((message) => (
                        <div className="message">
                            <p>{message.text}</p>
                            <div>
                                <span>{message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <form>
          <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="form-control"
              rows="3"></textarea>
                    <button onClick={onSendMessage} type="button" className="btn btn-success">
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
