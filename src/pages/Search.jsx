import styles from './Search.module.css';
import Card from '../components/Card/Card';
function Search({ cards }) {
    return (
        <main className={styles.content}>
            {cards.length > 0 ? (
                cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                    />
                ))
            ) : (
                <h2 className={styles.empty}>Введите текст в строку поиска</h2>
            )}
        </main>
    );
}
export default Search;
