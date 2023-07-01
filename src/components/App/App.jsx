import './App.css';
import Header from '../Header/Header';
import Search from '../../pages/Search';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Random from '../../pages/Random';
import { Route, Routes } from 'react-router-dom';
import Trends from '../../pages/Trends';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';
function App() {
    const [cards, setCards] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [randomGif, setRandomGif] = useState({});
    const [fetching, setFetching] = useState(false);
    const [currenQuery, setCurrentQuery] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [previewCard, setPrevieCard] = useState({});
    const [share, setShare] = useState('');
    const scrollHandler = (e) => {
        if (
            e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) ===
            0
        ) {
            setFetching(true);
        } else {
            setFetching(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [fetching]);

    useEffect(() => {
        if (fetching) {
            window.removeEventListener('scroll', scrollHandler);
            if (location.pathname === '/trends') {
                getCards();
            }
        }
    }, [fetching, cards]);

    useEffect(() => {
        navigate('/search', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getCards() {
        function getResponce() {
            return api.getTrending(`offset=${currenQuery}`).then((res) => {
                setCards((prev) => [...prev, ...res.data]);
                setCurrentQuery((prev) => prev + 50);
                setFetching(false);
            });
        }

        handleLink(getResponce);
    }

    function resetCards() {
        setCards((prev) => []);
        setCurrentQuery(0);
        setPrevieCard({});
        setSearchValue('');
    }

    useEffect(() => {
        searchValue ? api.getSearch(`q=${searchValue}`).then(({ data }) => setCards(data)) : setCards([]);
    }, [searchValue]);

    function handleTrends() {
        resetCards();
        getCards();
    }
    function handleShare(card) {
        navigator.clipboard.writeText(card.url);
    }
    function handleLink(request) {
        request().then().catch(console.error);
    }

    function handleRandomGifClick() {
        resetCards();
        function getRandomGif() {
            return api.getRandomGif().then((res) => setRandomGif(res.data));
        }
        handleLink(getRandomGif);
    }

    return (
        <>
            <Header
                onLink={resetCards}
                onTrend={handleTrends}
                onRandom={handleRandomGifClick}
            />
            <Routes>
                <Route
                    path='/search'
                    element={
                        <Search
                            onShare={handleShare}
                            onChange={setSearchValue}
                            searchValue={searchValue}
                            cards={cards}
                            onCard={setPrevieCard}
                        />
                    }
                ></Route>
                <Route
                    path='/trends'
                    element={
                        <Trends
                            onShare={handleShare}
                            onCard={setPrevieCard}
                            cards={cards}
                        />
                    }
                ></Route>
                <Route
                    path='/random'
                    element={<Random card={randomGif} />}
                />
                {previewCard.id && (
                    <Route
                        path={`/${previewCard.id}`}
                        element={
                            <div className='full-image'>
                                <Card
                                    onShare={handleShare}
                                    card={previewCard}
                                    onCard={() => {
                                        window.addEventListener('scroll', scrollHandler);
                                        window.history.go(-1);
                                    }}
                                />
                            </div>
                        }
                    ></Route>
                )}
            </Routes>
        </>
    );
}

export default App;
