import styles from './Search.module.css';
import Card from '../components/Card/Card';

function Search({ cards, searchValue, onChange, onShare, onCard }) {
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
                    {cards.map((card, index) => (
                        <Card
                            onShare={onShare}
                            key={index}
                            card={card}
                            onCard={onCard}
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
