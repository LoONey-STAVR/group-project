import './App.css';
import Header from '../Header/Header';
import Search from '../../pages/Search';
import { useEffect, useState } from 'react';
import api from '../../utils/Api';
import { Route, Routes } from 'react-router-dom';
import Trends from '../../pages/Trends';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');

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
            return api.getTrending(30).then(({ data }) => setCards(data));
        }
        handleLink(getResponce);
    }

    return (
        <>
            <Header
                onTrends={handleTrendsClick}
                onSearch={handleSearchLink}
            />
            <input
                className='input'
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Routes>
                <Route
                    path='/search'
                    element={<Search cards={cards} />}
                ></Route>
                <Route
                    path='/trends'
                    element={<Trends cards={cards} />}
                ></Route>
            </Routes>
        </>
    );
}

export default App;
