import './App.css';
import '../../css/animation-ascent.css';
import Header from '../Header/Header';
import Search from '../../pages/Search';
import { useCallback, useEffect, useState } from 'react';
import api from '../../utils/api';
import Random from '../../pages/Random';
import { Route, Routes } from 'react-router-dom';
import Trends from '../../pages/Trends';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FullImage from '../FullImage/FullImage';
import Categories from '../../pages/Categories/Categories';
import React from 'react';
import useScrollListener from '../hooks/useScrollListener';
import useCards from '../hooks/useCards';

function App() {
    const {
        cards,
        categories,
        searchValue,
        subCategory,
        previewCard,
        totalCount,
        currentQuery,
        debouncedValue,
        setNextCards,
        resetCards,
        setPrevieCard,
        setNewCards,
        setSearchValue,
        setSubcategory,
        setCategories,
    } = useCards();

    const [currentGifSlide, setCurrentGifSlide] = useState({});
    const [nextGifSlide, setNextGifSlide] = useState({});
    const [loadingGifState, setLoadingGitState] = useState(false);
    const { fetching, setFetching } = useScrollListener(cards, totalCount);
    const navigate = useNavigate();
    const location = useLocation();

    const handleFetch = useCallback((request) => {
        request().then().catch(console.error);
    }, []);

    useEffect(() => {
        if (subCategory && cards.length === 0) {
            function getResponce() {
                return api.getSearch(`q=${subCategory}&offset=${currentQuery}`).then(setNewCards);
            }
            handleFetch(getResponce);
        }
    }, [subCategory, currentQuery, cards.length, handleFetch, setNewCards]);

    const getNextTrendingCards = useCallback(() => {
        function getResponce() {
            return api.getTrending(`offset=${currentQuery}`).then(setNextCards);
        }
        handleFetch(getResponce);
    }, [currentQuery, setNextCards, handleFetch]);

    const getNextSubcategoriesCards = useCallback(() => {
        function getResponce() {
            return api.getSearch(`q=${subCategory}&offset=${currentQuery}`).then(setNextCards);
        }
        handleFetch(getResponce);
    }, [currentQuery, subCategory, handleFetch, setNextCards]);

    const handleChangeSearchValue = React.useCallback(() => {
        function getResponce() {
            return api.getSearch(`q=${debouncedValue}&offset=${currentQuery}`).then(setNewCards);
        }
        handleFetch(getResponce);
    }, [debouncedValue, handleFetch, setNewCards, currentQuery]);

    const getNextSearchCards = React.useCallback(() => {
        function getResponce() {
            return api.getSearch(`q=${debouncedValue}&offset=${currentQuery}`).then(setNextCards);
        }
        handleFetch(getResponce);
    }, [currentQuery, debouncedValue, handleFetch, setNextCards]);

    const getRandomGif = useCallback(() => {
        return api.getRandomGif().then((res) => {
            if (!res.data.user) {
                return getRandomGif();
            } else {
                return res.data;
            }
        });
    }, []);
    const getNextSlide = useCallback(() => {
        function getResponce() {
            return getRandomGif().then(setNextGifSlide);
        }
        handleFetch(getResponce);
    }, [handleFetch, getRandomGif]);

    const getCurrentSlide = useCallback(() => {
        function getResponce() {
            return getRandomGif().then(setCurrentGifSlide);
        }
        handleFetch(getResponce);
    }, [handleFetch, getRandomGif]);

    useEffect(() => {
        loadingGifState ? getNextSlide() : getCurrentSlide();
    }, [loadingGifState, getCurrentSlide, getNextSlide]);

    useEffect(() => {
        if (location.pathname === '/' && cards.length === 0) {
            function getResponce() {
                return api.getTrending(`offset=${currentQuery}`).then(setNewCards);
            }
            handleFetch(getResponce);
        }
    }, [location.pathname, cards.length, currentQuery, setNextCards, handleFetch, setNewCards]);

    useEffect(() => {
        handleChangeSearchValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    useEffect(() => {
        if (fetching) {
            setFetching(false);
            if (location.pathname === '/') {
                getNextTrendingCards();
            }
            if (location.pathname === '/search') {
                getNextSearchCards();
            }
            if (location.pathname === '/categories') {
                getNextSubcategoriesCards();
            }
        }
    }, [
        getNextSubcategoriesCards,
        getNextTrendingCards,
        fetching,
        setFetching,
        location.pathname,

        getNextSearchCards,
    ]);

    useEffect(() => {
        navigate('/', { replace: true });
        api.getCategory().then(({ data }) => {
            setCategories(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        function getResponce() {
            return Promise.all([getRandomGif(), getRandomGif()]).then(([current, next]) => {
                setCurrentGifSlide(current);
                setNextGifSlide(next);
            });
        }
        handleFetch(getResponce);
    }, [handleFetch]);

    return (
        <>
            <Header onLink={resetCards} />
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
                />
                <Route
                    path='/'
                    element={
                        <Trends
                            onCard={setPrevieCard}
                            cards={cards}
                        />
                    }
                />
                <Route
                    path='/random'
                    element={
                        <Random
                            current={currentGifSlide}
                            next={nextGifSlide}
                            onSwipe={setLoadingGitState}
                            loadingGifState={loadingGifState}
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
                            onSubcategory={setSubcategory}
                            onCard={setPrevieCard}
                            onCategories={setCategories}
                            categories={categories}
                            onBack={resetCards}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
