import React from 'react';
import '../styles/input.css'

const InputText = (props) => {
    return (
        <textarea {...props} className='inputText'/>
    );
};

export default InputText;