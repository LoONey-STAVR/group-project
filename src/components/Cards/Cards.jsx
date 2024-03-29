import React from 'react';
import './Cards.css';
import Card from '../Card/Card';

function Cards({ cards, onCard, name = '' }) {
    return (
        <ul className={`cards cards_${name}`}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    card={card}
                    onCard={onCard}
                />
            ))}
        </ul>
    );
}
export default Cards;
