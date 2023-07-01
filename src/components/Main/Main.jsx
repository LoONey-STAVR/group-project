import styles from './Main.module.css';
import Card from '../Card/Card';
function Main({ cards }) {
    return (
        <main className={styles.content}>
            {cards.length > 0
                ? cards.map((card) => (
                      <Card
                          key={card.id}
                          card={card}
                      />
                  ))
                : 'Ничего не найдено'}
        </main>
    );
}
export default Main;
