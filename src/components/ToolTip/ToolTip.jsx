import React from 'react';
import './ToolTip.css';

function ToolTip({ isActive, name }) {
    return <div className={`tooltip tooltip_${name} ${isActive && 'animation-opacity'}`}>Ссылка скопирована</div>;
}
export default ToolTip;
