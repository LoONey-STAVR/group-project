import React from 'react';
import './Category.css';

function Category({ name, index, onCategory, isSubcategory = false }) {
    return (
        <button
            type='button'
            key={index}
            index={index}
            onClick={onCategory}
            id={name}
            className={`category ${isSubcategory && 'category_subcategory'} animation-ascent no-highlight`}
        >
            {name}
        </button>
    );
}
export default Category;
