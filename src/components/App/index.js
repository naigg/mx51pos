import React, { useState, useEffect } from "react";
import axios from "axios";

// Constants
import { BASE_API_URL } from "../../constants/api";
import burgersApi from "../../constants/burger";
import drinksApi from "../../constants/drinks";
import friesApi from "../../constants/fries";
import sidesApi from "../../constants/sides";

// Styles
import "./App.css";

// Components
import FoodList from "../FoodList";
import OrderSummary from "../OrderSummary";

const App = () => {
  // API lists
  const [burgers, setBurgers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [fries, setFries] = useState([]);
  const [sides, setSides] = useState([]);

  // Order Summary list
  const [orderSummaryItems, setOrderSummaryItems] = useState([]);

  // Effects
  useEffect(() => {
    setBurgers(burgersApi);
    setDrinks(drinksApi);
    setFries(friesApi);
    setSides(sidesApi);
  }, []);

  //Handlers
  const onPayHandler = async ({ price, items }) => {
    const res = await axios.post(`${BASE_API_URL}/pay`, { price, items });

    const value = res.data;

    if (value.success) {
      alert(value.message);
    }
  };

  const itemHandler = (item) => {
    const currentItems = orderSummaryItems;
    const newItems = [...currentItems, item];

    setOrderSummaryItems(newItems);
  };

  const clearHandler = () => {
    setOrderSummaryItems([]);
  };

  const removeItemHandler = (item) => {
    const currentItems = orderSummaryItems;
    let hasChecked = false;
    const newItems = currentItems.filter((currItem) => {
      const isItem = currItem.id === item.id;
      if (!hasChecked && isItem) {
        hasChecked = true;
        return false;
      }
      return true;
    });
    setOrderSummaryItems(newItems);
  };

  return (
    <div className="app">
      <h1 className="app__header">Cali Burgers</h1>
      <div className="app__content">
        <div className="app__left">
          <FoodList title="Burgers" items={burgers} itemHandler={itemHandler} />
          <FoodList title="Fries" items={fries} itemHandler={itemHandler} />
          <FoodList title="Sides" items={sides} itemHandler={itemHandler} />
          <FoodList title="Drinks" items={drinks} itemHandler={itemHandler} />
        </div>
        <OrderSummary
          summary={orderSummaryItems}
          submitHandler={onPayHandler}
          clearHandler={clearHandler}
          addItemHandler={itemHandler}
          removeItemHandler={removeItemHandler}
        />
      </div>
    </div>
  );
};

export default App;
