import React, {useEffect, useState} from 'react';
import NewButton from "./UI/button/NewButton";
import InputText from "./UI/input/InputText";
import InputName from "./UI/input/InputName";
import {showToast} from "../tools/toast";
import '../styles/Chat.css'

const OnlineChat = () => {

    const [messages, setMessages] = useState([{id: 0, message: "Загрузка чата...", name: "Server"}])
    const [reload, startReload] = useState(0)
    const [username, setUsername] = useState('')
    const [msg, setMsg] = useState('')


    useEffect(() => {
        fetch("/get_messages").then(
            res => res.json()
        ).then(data => {
            setMessages(data.data)
        })
    }, [reload])

    function addNewMessage(){
        let data = new FormData()
        data.append("username", username)
        data.append("message", msg)
        fetch("/add_message", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(rtn => rtn.json()).then(
            sts => {
                if (sts.status) {
                    showToast('success', 'Сообщение в чат успешно отправлено')
                } else {
                    showToast('warn', 'Сообщение не было доставлено: ' + sts.warn)
                }
            }
        )
        setMsg('')
        startReload(reload + 1)
    }

    return (
        <div>
            <div className='chat'>
                {messages.map(msg =>
                    <div key={msg.id} className='message' id={'msg-' + msg.id}>
                        <h4>{msg.name}: {msg.message}</h4>
                    </div>
                )}

            </div>
            <InputText placeholder="Текст сообщения" value={msg} onChange={e => setMsg(e.target.value)}/>
            <InputName placeholder="Ваше имя в чате" value={username} onChange={e => setUsername(e.target.value)}/>
            <NewButton onClick={addNewMessage}>Отправить сообщение</NewButton>
            <NewButton onClick={() => {startReload(reload + 1)
                showToast('info', 'Обновление чата')}}>upd</NewButton>
        </div>
    );
};

export default OnlineChat;