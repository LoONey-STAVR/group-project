import React from 'react';
import styles from './Trends.module.css';
import Card from '../components/Card/Card';

function Trends({ cards }) {
    return (
        <main className={styles.content}>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                />
            ))}
        </main>
    );
}
export default Trends;
