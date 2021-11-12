import React from 'react';


const NewButton = ({children, ...props}) => {
    return (
        <button {...props}>
            {children}
        </button>
    );
};

export default NewButton;