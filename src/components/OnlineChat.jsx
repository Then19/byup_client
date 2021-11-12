import React, {useEffect, useState} from 'react';
import NewButton from "./UI/button/NewButton";
import InputText from "./UI/input/InputText";
import InputName from "./UI/input/InputName";
import {showToast} from "../tools/toast";
import '../styles/Chat.css'

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


    useEffect(() => {
        let data = new FormData()
        data.append("page", page)
        fetch("/get_messages", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then(data => {
            setMessages(data.data)
        })
    }, [reload])

    function addNewMessage(){
        localStorage.setItem("ChatName", username)

        let data = new FormData()
        data.append("username", username)
        data.append("message", msg)
        data.append("page", page)
        fetch("/add_message", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(rtn => rtn.json()).then(
            sts => {
                if (sts.status) {
                    showToast('success', 'Комментарий успешно оставлен')
                    startReload(reload + 1)
                } else {
                    showToast('warn', 'Комментарий не был оставлен: ' + sts.warn)
                }
            }
        )
        setMsg('')
    }

    return (
        <div className="full-chat">
            <InputText className="inputText" placeholder="Текст сообщения" value={msg} onChange={e => setMsg(e.target.value)}/>
            <InputName className="inputName" placeholder="Ваше имя" value={username} onChange={u => setUsername(u.target.value)}/>
            <NewButton className="myBtn" onClick={addNewMessage}>Отправить сообщение</NewButton>
            <NewButton className="myBtn" onClick={() => {startReload(reload + 1)
                showToast('info', 'Обновление чата')}}>upd</NewButton>
            <div className='chat'>
                {messages.map(msg =>
                    <div key={msg.id} className='message' id={'msg-' + msg.id}>
                        <h3>{msg.name}: <span className='font-15'>{msg.message}</span></h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OnlineChat;