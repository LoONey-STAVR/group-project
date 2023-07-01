import styles from './Search.module.css';
import Card from '../components/Card/Card';
function Search({ cards, searchValue, onChange }) {
    function handleChangeInput(e) {
        onChange(e.target.value);
    }
    return (
        <main className={styles.content}>
            <input
                className={styles.input}
                type='text'
                value={searchValue}
                onChange={handleChangeInput}
            />
            {cards.length > 0 ? (
                <div className={styles.cards}>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            card={card}
                        />
                    ))}
                </div>
            ) : (
                <h2 className={styles.title}></h2>
            )}
        </main>
    );
}
export default Search;
