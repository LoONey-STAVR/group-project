import './Search.css';
import Card from '../components/Card/Card';

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
                <div className='search__cards'>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            onCard={onCard}
                        />
                    ))}
                </div>
            ) : (
                <h2 className='search__title'>Список пуст</h2>
            )}
        </section>
    );
}
export default Search;
