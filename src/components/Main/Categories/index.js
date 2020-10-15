// Categories

//  Landing page should display all available categories => Pulled from database
//      On initial render (useEffect) => load all categories
//  Each category should be clickable & set currentCategory prop to selected category
//      currentCategory should initialize as empty string

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import './categories.scss';
import { getCategories, selectCategory } from '../../../store/categories';

const Categories = ({ getCategories, selectCategory, categories, active }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  console.log('ACTIVE CATEGORY: ', active);

  return (
    <>
      <h2 className="c_title">Available Categories</h2>
      <ul 
      className="categories"
      // style={{ display: 'flex', flexDirection: 'row' }}
      >
        {categories.map(eachCategory => {
          return (
            <Card 
            className="eachCategory" 
            key={eachCategory}
            bg="light"
            >
              <Card.Body onClick={() => selectCategory(eachCategory)}>
                {eachCategory}
              </Card.Body>
            </Card>
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
