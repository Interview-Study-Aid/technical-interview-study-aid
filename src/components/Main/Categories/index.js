// Categories

//  Landing page should display all available categories => Pulled from database
//      On initial render (useEffect) => load all categories
//  Each category should be clickable & set currentCategory prop to selected category
//      currentCategory should initialize as empty string

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCategories, selectCategory } from '../../../store/categories';

const Categories = ({ getCategories, selectCategory, categories }) => {
  return (
    <>
      <h2>Categories Component</h2>
    </>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
  };
};

const mapDispatchToProps = { getCategories, selectCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
