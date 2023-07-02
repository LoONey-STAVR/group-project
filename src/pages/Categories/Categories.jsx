import React from 'react';
import './Categories.css';
import { useEffect } from 'react';
import backIcon from '../../images/bkac.svg';
import Cards from '../../components/Cards/Cards';
function Categories({ onBack, categories, onCategories, cards, onCard, onSubcategory }) {
    const [isActive, setIsActive] = React.useState(true);
    const [currentSubcategories, setCurrentSubcategories] = React.useState([]);
    function handleCategory(index) {
        setCurrentSubcategories(categories[index].subcategories);
    }
    function handleSubcategory(e) {
        onSubcategory(e.target.id);
    }
    function handleBack() {
        onBack();
        setIsActive(false);
        setCurrentSubcategories([]);
    }

    useEffect(() => {
        if (currentSubcategories.length === 0) {
            setIsActive(false);
        } else {
            onCategories(currentSubcategories);
            setIsActive(true);
        }
    }, [currentSubcategories, isActive]);

    return (
        <div className='categories'>
            {isActive && (
                <button
                    onClick={handleBack}
                    style={{
                        backgroundImage: `url(${backIcon})`,
                    }}
                    className='categories__back-btn'
                ></button>
            )}
            {cards.length === 0 ? (
                <ul className='categories__list'>
                    {categories.map((el, index) => (
                        <p
                            key={index}
                            index={index}
                            onClick={(e) => {
                                !isActive ? handleCategory(index) : handleSubcategory(e);
                            }}
                            id={el.name}
                            className={`category ${isActive && 'subcategory'} animation-ascent`}
                        >
                            {el.name}
                        </p>
                    ))}
                </ul>
            ) : (
                <Cards
                    cards={cards}
                    onCard={onCard}
                />
            )}
        </div>
    );
}
export default Categories;
