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

  useEffect(() => {
    setBurgers(burgersApi);
    setDrinks(drinksApi);
    setFries(friesApi);
    setSides(sidesApi);
  }, []);

  const onPayHandler = async ({ price, items }) => {
    const res = await axios.post(`${BASE_API_URL}/pay`, { price, items });

    const value = res.data;
    console.log(value);
  };

  const itemHandler = (item) => {
    const currentItems = orderSummaryItems;
    const newItems = [...currentItems, item];

    setOrderSummaryItems(newItems);
  };

  const clearHandler = () => {
    setOrderSummaryItems([]);
  };

  return (
    <div className="app">
      <h1 className="app__header">Cali Burgers</h1>
      <div>
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
        />
      </div>
    </div>
  );
};

export default App;
