import React, {useState} from 'react';
import {showToast} from "../tools/toast";
import NewButton from "./UI/button/NewButton";

const Test = () => {
    function getLocalCount () {
        const val = parseInt(localStorage.getItem('count'), 0)
        if (val) {
            return val
        } else {
            return 0
        }
    }

    function getLocalCheck () {
        const val = parseInt(localStorage.getItem('check'), 0)
        if (val) {
            return val
        } else {
            return 0
        }
    }

    const [count, setCount] = useState(getLocalCount)
    const [check, setCheck] = useState(getLocalCheck)

    function increment() {
        let new_count = getLocalCount() + 1
        setCount(new_count)
        localStorage.setItem('count', new_count)
        showToast('info', 'Плюс один')
    }

    function decrement() {
        let new_count = getLocalCount() - 1
        setCount(new_count)
        localStorage.setItem('count', new_count)
        showToast('info', 'Минус один')
    }

    function setClear() {
        setCheck(count)
        localStorage.setItem('check', count)
        localStorage.setItem('count', 0)
        setCount(0)
        if (count !== 0) {
            showToast('success', 'Успешно очищено')
        } else if (count === 0 && check !== 0) {
            showToast('warn', 'Ладно, вторая строка тоже очищена')
        } else {
            showToast('error', 'Оно и так равно нулю, что ты очищаешь...')
        }
    }

    return (
        <div>
            <h1>{count}</h1>
            <NewButton onClick={increment}>increment</NewButton>
            <NewButton onClick={decrement}>decrement</NewButton>
            <NewButton onClick={setClear}>clear</NewButton>
            <h2>{check}</h2>
        </div>
    );
};

export default Test;