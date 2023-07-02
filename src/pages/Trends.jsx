import React from 'react';
import styles from './Trends.module.css';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom';

import './Trends.css';
function Trends({ cards, onCard }) {
    return (
        <section className='trends'>
            <div className='trends__cards'>
                {cards.map((card, index) => (
                    <Card

                        onCard={onCard}
                        key={index}
                        card={card}
                    />
                ))}
            </div>
        </section>
    );
}
export default Trends;
