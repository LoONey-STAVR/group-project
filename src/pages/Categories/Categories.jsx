import React from 'react';
import './Categories.css';
import { useEffect } from 'react';
import backIcon from '../../images/bkac.svg';
import Cards from '../../components/Cards/Cards';
import Category from '../../components/Category/Category';
import Back from '../../components/Back/Back';
function Categories({ categories, cards, onCard, onSubcategory, onBack }) {
    const [isActive, setIsActive] = React.useState(true);

    const [currentCategory, setCurrentCategory] = React.useState([]);

    function handleCategory(e) {
        const index = e.target.attributes.index.value;
        setCurrentCategory(categories[index].subcategories);
    }

    function handleSubcategory(e) {
        onSubcategory(e.target.id);
    }
    function handleBack() {
        setIsActive(false);
        setCurrentCategory([]);
        onBack();
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (currentCategory.length === 0) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [currentCategory, isActive]);

    function isButtonActive() {
        return isActive || cards.length > 0;
    }

    return (
        <div className='categories'>
            {isButtonActive() && (
                <Back
                    onBack={handleBack}
                    name='categories'
                />
            )}
            {cards.length === 0 ? (
                <ul className='categories__list'>
                    {currentCategory.length === 0
                        ? categories.map((el, index) => (
                              <Category
                                  name={el.name}
                                  index={index}
                                  key={index}
                                  onCategory={handleCategory}
                              />
                          ))
                        : currentCategory.map((el, index) => (
                              <Category
                                  name={el.name}
                                  index={index}
                                  key={index}
                                  onCategory={handleSubcategory}
                                  isSubcategory={true}
                              />
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
