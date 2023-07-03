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
import FullImage from '../FullImage/FullImage';
import Categories from '../../pages/Categories/Categories';
import React from 'react';
import useScrollListener from '../hooks/useScrollListener';
import useDebounce from '../hooks/useDebounce';

function App() {
    const [cards, setCards] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [randomGif, setRandomGif] = useState({});
    const [fetching, setFetching] = useScrollListener(cards, totalCount);
    const [currenQuery, setCurrentQuery] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [previewCard, setPrevieCard] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategory, setSubcategory] = React.useState('');
    const debouncedValue = useDebounce(searchValue);

    function handleCategory(newArray) {
        setCategories(newArray);
    }

    function handleBackCategories() {
        api.getCategory().then(({ data }) => setCategories(data));
        setCards([]);
    }
    const resetCards = React.useCallback(() => {
        setCards((prev) => []);
        setCurrentQuery((prev) => prev - prev);
        setPrevieCard({});
        setSearchValue('');
        handleBackCategories();
        setTotalCount(0);
        setSubcategory('');
    }, []);

    const handleSubCategory = React.useCallback(
        (tag) => {
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
        },
        [currenQuery, setFetching]
    );

    const getNextTrendingCards = React.useCallback(() => {
        function getResponce() {
            return api.getTrending(`offset=${currenQuery}`).then((res) => {
                setCards((prev) => [...prev, ...res.data.filter((el) => el.username !== '')]);
                setCurrentQuery((prev) => prev + res.data.length);
                setFetching(false);
                setTotalCount(res.pagination.total_count);
            });
        }
        handleFetch(getResponce);
    }, [currenQuery, setFetching]);
    const handleTrends = React.useCallback(() => {
        function getResponce() {
            return api.getTrending(``).then((res) => {
                setFetching(false);
                setCards((prev) => [...res.data.filter((el) => el.username !== '')]);
                setCurrentQuery((prev) => res.data.length);
                setTotalCount(res.pagination.total_count);
            });
        }
        handleFetch(getResponce);
    }, [setFetching]);

    function handleFetch(request) {
        request().then().catch(console.error);
    }

    function handleRandomGifClick() {
        function getResponce() {
            return api.getRandomGif().then((res) => setRandomGif(res.data));
        }
        handleFetch(getResponce);
    }

    const handleChangeSearchValue = React.useCallback(() => {
        function getResponce() {
            return api.getSearch(`q=${debouncedValue}`).then((res) => {
                setCards(res.data);
                setCurrentQuery(res.data.length);
                setTotalCount(res.pagination.total_count);
            });
        }
        handleFetch(getResponce);
    }, [debouncedValue]);

    const getNextSearchCards = React.useCallback(() => {
        function getResponce() {
            return api.getSearch(`q=${debouncedValue}&offset=${currenQuery}`).then((res) => {
                setCards((prev) => [...prev, ...res.data]);
                setCurrentQuery((prev) => prev + res.data.length);
                setFetching(false);
            });
        }

        handleFetch(getResponce);
    }, [currenQuery, debouncedValue, setFetching]);
    useEffect(() => {
        if (debouncedValue) {
            setCurrentQuery((prev) => prev - prev);
            handleChangeSearchValue();
        }
        setCards([]);
        setCurrentQuery(0);
    }, [debouncedValue, handleChangeSearchValue]);

    useEffect(() => {
        if (fetching) {
            if (location.pathname === '/trends') {
                getNextTrendingCards();
            }
            if (location.pathname === '/search' && searchValue) {
                getNextSearchCards();
            }
            if (location.pathname === '/categories') {
                handleSubCategory(subCategory);
            }
            setFetching(false);
        }
    }, [
        getNextTrendingCards,
        fetching,
        cards,
        subCategory,
        searchValue,
        setFetching,
        location.pathname,
        handleTrends,
        navigate,
        getNextSearchCards,
        handleSubCategory,
    ]);

    useEffect(() => {
        navigate('/search', { replace: true });

        api.getCategory().then(({ data }) => {
            setCategories(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
