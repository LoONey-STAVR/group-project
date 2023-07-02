import React from 'react';
import './Trends.css';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom';
import Cards from '../components/Cards/Cards';

import './Trends.css';
function Trends({ cards, onCard }) {
    return (
        <section className='trends'>
            <Cards
                cards={cards}
                onCard={onCard}
            />
        </section>
    );
}
export default Trends;
