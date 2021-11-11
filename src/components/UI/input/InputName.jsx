import React from 'react';
import '../styles/input.css'

const InputText = (props) => {
    return (
        <input {...props} className='inputName' type="text"/>
    );
};

export default InputText;