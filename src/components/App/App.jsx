import './App.css';
import '../../css/animation-ascent.css';
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
import FullImage from '../FullImage/FullImage';
import Categories from '../../pages/Categories/Categories';
import React from 'react';
import useScrollListener from '../hooks/useScrollListener';

function App() {
    const [cards, setCards] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [randomGif, setRandomGif] = useState({});
    const [fetching, setFetching, scrollHandler] = useScrollListener(cards, totalCount);
    const [currenQuery, setCurrentQuery] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [previewCard, setPrevieCard] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubcategory] = React.useState('');

    function handleCategory(newArray) {
        setCategories(newArray);
    }

    function handleBackCategories() {
        api.getCategory().then(({ data }) => setCategories(data));
        setCards([]);
    }

    function resetCards() {
        setCards((prev) => []);
        setCurrentQuery(0);
        setPrevieCard({});
        setSearchValue('');
        handleBackCategories();
        setTotalCount(0);
        setSubcategory('');
    }

    function handleSubCategory(tag) {
        setSubcategory(tag);
        function getResponce() {
            return api.getSearch(`q=${tag}&offset=${currenQuery}`).then((res) => {
                setCurrentQuery((prev) => prev + res.data.length);
                setTotalCount(res.pagination.total_count);
                setCards((prev) => [...prev, ...res.data]);
                setFetching(false);
            });
        }
        handleFetch(getResponce);
    }

    function handleTrends() {
        resetCards();
        function getResponce() {
            return api.getTrending(`offset=${currenQuery}`).then((res) => {
                setCards((prev) => [...prev, ...res.data.filter((el) => el.username !== '')]);
                setCurrentQuery((prev) => prev + res.data.length);
                setFetching(false);
                setTotalCount(res.pagination.total_count);
            });
        }

        handleFetch(getResponce);
    }

    function handleFetch(request) {
        request().then().catch(console.error);
    }

    function handleRandomGifClick() {
        resetCards();
        function getResponce() {
            return api.getRandomGif().then((res) => setRandomGif(res.data));
        }
        handleFetch(getResponce);
    }

    function handleChangeSearchValue() {
        function getResponce() {
            return api.getSearch(`q=${searchValue}`).then((res) => {
                setCards(res.data);
                setCurrentQuery(res.data.length);
                setTotalCount(res.pagination.total_count);
            });
        }
        handleFetch(getResponce);
    }

    function getNextSearchCards() {
        function getResponce() {
            return api.getSearch(`q=${searchValue}&offset=${currenQuery}`).then((res) => {
                setCards((prev) => [...prev, ...res.data]);
                setCurrentQuery((prev) => prev + res.data.length);
                setFetching(false);
            });
        }

        handleFetch(getResponce);
    }

    useEffect(() => {
        if (searchValue) {
            setCurrentQuery((prev) => prev - prev);
            handleChangeSearchValue();
        }
        setCards([]);
        setCurrentQuery(0);
    }, [searchValue]);

    useEffect(() => {
        if (fetching) {
            window.removeEventListener('scroll', scrollHandler);
            if (location.pathname === '/trends') {
                handleTrends();
            }
            if (location.pathname === '/search' && searchValue) {
                getNextSearchCards();
            }
            if (location.pathname === '/categories') {
                handleSubCategory(subCategory);
            }
            setFetching(false);
        }
    }, [fetching, cards, scrollHandler]);

    useEffect(() => {
        navigate('/search', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        api.getCategory().then(({ data }) => {
            setCategories(data);
        });
    }, []);

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
                            onCard={setPrevieCard}
                            cards={cards}
                        />
                    }
                ></Route>
                <Route
                    path='/random'
                    element={
                        <Random
                            card={randomGif}
                            handleClickBtn={handleRandomGifClick}
                        />
                    }
                />
                {previewCard.id && (
                    <Route
                        path={`/${previewCard.id}`}
                        element={<FullImage card={previewCard} />}
                    ></Route>
                )}
                <Route
                    path='/categories'
                    element={
                        <Categories
                            cards={cards}
                            onSubcategory={handleSubCategory}
                            onCard={setPrevieCard}
                            onCategories={handleCategory}
                            categories={categories}
                            onBack={handleBackCategories}
                        />
                    }
                ></Route>
            </Routes>
        </>
    );
}

export default App;
