import React from 'react';
import './Share.css';
import iconShare from '../../images/share.svg';
function Share({ onShare, name = '', isActive }) {
    function handleShare(e) {
        e.preventDefault();
        onShare(e);
    }
    return (
        <button
            onClick={handleShare}
            style={{
                backgroundImage: `url(${iconShare})`,
            }}
            className={`share ${name && 'share_' + name} no-highlight ${isActive && 'share_disabled'}`}
        ></button>
    );
}
export default Share;
