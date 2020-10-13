// Categories

//  Landing page should display all available categories => Pulled from database
//      On initial render (useEffect) => load all categories
//  Each category should be clickable & set currentCategory prop to selected category
//      currentCategory should initialize as empty string

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategories, selectCategory } from '../../../store/categories';

const Categories = ({ getCategories, selectCategory, categories, active }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  console.log('ACTIVE CATEGORY: ', active);

  return (
    <>
      <h2>Categories Component</h2>
      <ul>
        {categories.map(eachCategory => {
          return (
            <li key={eachCategory} onClick={() => selectCategory(eachCategory)}>
              {eachCategory}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    active: state.categories.activeCategory,
  };
};

const mapDispatchToProps = { getCategories, selectCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
