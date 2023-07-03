import React from 'react';
import './Back.css';
import iconBack from '../../images/bkac.svg';
function Back({ onBack, name = '' }) {
    return (
        <button
            onClick={onBack}
            style={{
                backgroundImage: `url(${iconBack})`,
            }}
            className={`back ${name && 'back_' + name}`}
        ></button>
    );
}
export default Back;
