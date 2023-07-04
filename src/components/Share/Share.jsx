import React from 'react';
import './Share.css';
import iconShare from '../../images/share.svg';

function Share({ onShare, name = '' }) {
    function handleShare(e) {
        e.preventDefault();
        onShare();
    }
    return (
        <button
            onClick={handleShare}
            style={{
                backgroundImage: `url(${iconShare})`,
            }}
            className={`share ${name && 'share_' + name} no-highlight`}
        ></button>
    );
}
export default Share;
