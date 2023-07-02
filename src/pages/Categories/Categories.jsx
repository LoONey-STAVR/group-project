import React from 'react';
import './Categories.css';
import { useEffect } from 'react';
import Card from '../../components/Card/Card';
import backIcon from '../../images/bkac.svg';
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
                categories.map((el, index) => (
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
                ))
            ) : (
                <div className='categories__cards'>
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            onCard={onCard}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Categories;
