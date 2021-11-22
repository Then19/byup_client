import React, {useEffect, useState} from 'react';
import NewButton from "./UI/button/NewButton";
import InputText from "./UI/input/InputText";
import InputName from "./UI/input/InputName";
import {showToast} from "../tools/toast";
import '../styles/Chat.css'
import axios from "axios";

const OnlineChat = ({page, ...props}) => {

    function getLocalChatName () {
        const val = localStorage.getItem('ChatName')
        if (val) {
            return val
        } else {
            return ''
        }
    }

    const [messages, setMessages] = useState([{id: 0, message: "Загрузка сообщений...", name: "Server"}])
    const [reload, startReload] = useState(0)
    const [username, setUsername] = useState(getLocalChatName())
    const [msg, setMsg] = useState('')

    async function getMessagesApi() {
        let data = new FormData()
        data.append("page", page)
        const response = await axios({
            url: 'https://api.byup.ru/get_messages',
                method: 'POST',
                data: data,
                headers: {
                Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
            },
        })
        setMessages(response.data.data)
    }


    useEffect(() => {
        getMessagesApi()
    }, [reload])

    async function addNewMessage(){
        localStorage.setItem("ChatName", username)

        let data = new FormData()
        data.append("username", username)
        data.append("message", msg)
        data.append("page", page)

        const response = await axios({
            url: 'https://api.byup.ru/add_message',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.data.status) {
            showToast('success', 'Комментарий успешно оставлен')
            startReload(reload + 1)
        } else {
            showToast('warn', 'Комментарий не был оставлен: ' + response.data.warn)
        }
        setMsg('')
    }

    return (
        <div className="full-chat">
            <div className="chat-button-block">
                <InputText className="inputText" placeholder="Комментарий" value={msg} onChange={e => setMsg(e.target.value)}/>
                <NewButton className="myBtn" onClick={addNewMessage}>Оставить комментарий</NewButton>
                <InputName className="inputName" placeholder="Ваше имя" value={username} onChange={u => setUsername(u.target.value)}/>

            </div>
            <div className='chat'>
                {messages.map(msg =>
                    <div key={msg.id} className='message' id={'msg-' + msg.id}>
                        <div>
                            <h3>{msg.name}: <span className='font-15'>{msg.message}</span></h3>
                        </div>
                        <div>
                            <span>{msg.time}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnlineChat;