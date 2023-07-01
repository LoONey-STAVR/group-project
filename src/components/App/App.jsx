import './App.css';
import Header from '../Header/Header';
import Search from '../../pages/Search';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Random from '../Random/Random';
import { Route, Routes } from 'react-router-dom';
import Trends from '../../pages/Trends';
import { useNavigate } from 'react-router-dom';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [randonGif, setRandomGif] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        api.getRandomGif()
            .then((res) => setRandomGif(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        navigate('/search', { replace: true });
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

            {/* <Random card={randonGif} /> */}

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
            </Routes>
        </>
    );
}

export default App;
