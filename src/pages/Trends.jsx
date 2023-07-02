import React from 'react';
import styles from './Trends.module.css';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom';
import './Trends.css';
function Trends({ cards, onCard, onShare }) {
    return (
        <section className='trends'>
            {cards.map((card, index) => (
                <Card
                    onShare={onShare}
                    onCard={onCard}
                    key={index}
                    card={card}
                />
            ))}
        </section>
    );
}
export default Trends;
