import { useState, useCallback } from 'react';
import useDebounce from './useDebounce';
export default function useCards() {
    const [previewCard, setPrevieCard] = useState({});
    const [cards, setCards] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentQuery, setCurrentQuery] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [subCategory, setSubcategory] = useState('');
    const [categories, setCategories] = useState([]);
    const debouncedValue = useDebounce(searchValue);
    const resetCards = useCallback(() => {
        setCards([]);
        setCurrentQuery(0);
        setPrevieCard({});
        setSearchValue('');
        setTotalCount(0);
        setSubcategory('');
    }, []);

    function getFiltredCards(cards) {
        const filtredCards = [...cards.filter((card) => card.user && card.title !== '')];
        const notFiltredCardsLength = cards.length - filtredCards.length;
        return [filtredCards, notFiltredCardsLength, cards.length];
    }

    function setNewCards(res) {
        const [cards, filterLength, length] = getFiltredCards(res.data);
        setCards(cards);
        setCurrentQuery(length);
        setTotalCount(res.pagination.total_count - filterLength);
    }

    function setNextCards(res) {
        const [cards, filterLength, length] = getFiltredCards(res.data);
        setCards((prev) => [...prev, ...cards]);
        setCurrentQuery((prev) => prev + length);
        setTotalCount((prev) => prev - filterLength);
    }

    return {
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
    };
}
