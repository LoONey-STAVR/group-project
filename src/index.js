import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './vendor/normalize.css';
import App from './components/App/App';
import './index.css';
import './css/animation-ascent.css';
import './css/no-highlight.css';
import './css/animation-opacity.css';
import './css/animation-fade.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
