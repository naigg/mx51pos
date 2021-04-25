import React from "react";
import PropTypes from "prop-types";

// Styles
import "./FoodList.css";

const FoodList = ({ title, items, itemHandler }) => {
  return (
    <div>
      <p>{title}</p>
      <ul className="food-list">
        {items.map((item) => (
          <li key={item.id} className="food-list__item">
            <img
              onClick={() => itemHandler(item)}
              src={item.imageUrl}
              alt={item.name}
            />
            <span>{item.name}</span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

FoodList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  itemHandler: PropTypes.func,
};

export default React.memo(FoodList);
