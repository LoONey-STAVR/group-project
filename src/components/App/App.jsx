import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Random from '../Random/Random';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [randonGif, setRandomGif] = useState({})
    useEffect(() => {
        api.getTrending(20).then(({ data }) => {
            setCards(data);
        });
        api.getRandomGif()
            .then(res => setRandomGif(res.data))
            .catch(err => console.log(err))
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
            <Random card={randonGif} />
            {/* <Main cards={cards} /> */}
        </>
    );
}

export default App;
