import React from 'react';
import '../styles/button.css'


const NewButton = ({children, ...props}) => {
    return (
        <button {...props} className='myBtn'>
            {children}
        </button>
    );
};

export default NewButton;