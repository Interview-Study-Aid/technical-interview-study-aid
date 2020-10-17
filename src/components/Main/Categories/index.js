import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import './categories.scss';
import { getCategories, selectCategory } from '../../../store/categories';

const Categories = ({ getCategories, selectCategory, categories, active }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <>
      <h2 className="c_title">Available Categories</h2>
      <ul className="categories">
        {categories.map(eachCategory => {
          return (
            <Card className="eachCategory" key={eachCategory} bg="light">
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
