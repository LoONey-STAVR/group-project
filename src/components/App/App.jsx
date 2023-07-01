import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useEffect, useState } from 'react';
import api from '../../utils/Api';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        api.getTrending(20).then(({ data }) => {
            setCards(data);
        });
    }, []);

    useEffect(() => {
        searchValue && api.getSearch(searchValue).then(({ data }) => setCards(data));
    }, [searchValue]);

    return (
        <>
            <Header />
            <input
                className='input'
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Main cards={cards} />
        </>
    );
}

export default App;
