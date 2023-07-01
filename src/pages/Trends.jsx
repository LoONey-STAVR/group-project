import React from 'react';
import styles from './Trends.module.css';
import Card from '../components/Card/Card';
import { Link } from 'react-router-dom';

function Trends({ cards, onCard, onShare }) {
    return (
        <main className={styles.content}>
            {cards.map((card, index) => (
                <Card
                    onShare={onShare}
                    onCard={onCard}
                    key={index}
                    card={card}
                />
            ))}
        </main>
    );
}
export default Trends;
