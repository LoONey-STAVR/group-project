import React from 'react';
import './Categories.css';
import { useEffect } from 'react';
import Card from '../../components/Card/Card';
import backIcon from '../../images/bkac.svg';
function Categories({ onBack, categories, onCategories, cards, onCard, onShare, onSubcategory }) {
    const [isActive, setIsActive] = React.useState(true);
    const [currentCategory, setCurrentCategory] = React.useState([]);
    function handleCategory(index) {
        setCurrentCategory(categories[index].subcategories);
    }
    function handleSubcategory(e) {
        onSubcategory(e.target.id);
    }
    function handleBack() {
        onBack();
        setIsActive(false);
        setCurrentCategory([]);
    }

    useEffect(() => {
        if (currentCategory.length === 0) {
            setIsActive(false);
        } else {
            onCategories(currentCategory);
            setIsActive(true);
        }
    }, [currentCategory, isActive]);

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
                        className={`category ${isActive && 'subcategory'}`}
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
                            onShare={onShare}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default Categories;
