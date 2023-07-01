import './App.css';
import Header from '../Header/Header';
import Search from '../../pages/Search';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Random from '../../pages/Random';
import { Route, Routes } from 'react-router-dom';
import Trends from '../../pages/Trends';
import { useNavigate } from 'react-router-dom';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [randomGif, setRandomGif] = useState({})
    const [randomPageState, setRandomPageState] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/search', { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        searchValue ? api.getSearch(searchValue).then(({ data }) => setCards(data)) : setCards([]);
    }, [searchValue]);

    function handleSearchLink() {
        setCards([]);
        setSearchValue('');
    }
    function handleLink(request) {
        request().then().catch(console.error);
    }
    function handleTrendsClick() {
        function getResponce() {
            return api.getTrending(30).then(({ data }) => {
                setCards(data)
                setRandomPageState(false)
            });
        }
        handleLink(getResponce);
    }
    function handleRandomGifClick() {
        function getRandomGif() {
            return api.getRandomGif().then((res) => {
                setRandomPageState(true)
                setRandomGif(res.data)
            })
        }
        handleLink(getRandomGif)
    }

    return (
        <>
            <Header
                onTrends={handleTrendsClick}
                onSearch={handleSearchLink}
                onRandom={handleRandomGifClick}
            />
            {!randomPageState && <input
                className='input'
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />}
            <Routes>
                <Route
                    path='/search'
                    element={
                        <Search
                            onChange={setSearchValue}
                            searchValue={searchValue}
                            cards={cards}
                        />
                    }
                ></Route>
                <Route
                    path='/trends'
                    element={<Trends cards={cards} />}
                ></Route>
                <Route path='/random' element={<Random card={randomGif} />} />
            </Routes>
        </>
    );
}

export default App;
