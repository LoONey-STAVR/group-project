import './Search.css';
import Cards from '../components/Cards/Cards';

function Search({ cards, searchValue, onChange, onCard }) {
    function handleChangeInput(e) {
        onChange(e.target.value);
    }

    return (
        <section className='search'>
            <div className='search__shadow'>
                <input
                    className='search__input'
                    type='text'
                    value={searchValue}
                    onChange={handleChangeInput}
                />
            </div>
            {cards.length > 0 ? (
                <Cards
                    cards={cards}
                    onCard={onCard}
                />
            ) : (
                <h2 className='search__empty'>Список пуст</h2>
            )}
        </section>
    );
}
export default Search;
