import React from 'react';
import './Trends.css';
import Cards from '../components/Cards/Cards';
import Slider from '../components/Slider/Slider';

import './Trends.css';
function Trends({ cards, onCard }) {
    return (
        <section className='trends'>
            <Slider cards={cards} />
            <Cards
                cards={cards}
                onCard={onCard}
            />
        </section>
    );
}
export default Trends;
