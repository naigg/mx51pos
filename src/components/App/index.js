import React from "react";
import axios from "axios";

// Constants
import { BASE_API_URL } from "../../constants/api";

// Components
import Button from "../Button";

const App = () => {
  const onPayHandler = async () => {
    const res = await axios.post(`${BASE_API_URL}/pay`, { price: 100 });

    const value = res.data;
    console.log(value);
  };

  return (
    <div>
      <h1>Home page</h1>
      <div>
        <div>Burgers</div>
        <div>Fries</div>
        <div>Sides</div>
        <div>Drinks</div>
      </div>
      <div>
        <div>Order Summary</div>
        <Button onClick={onPayHandler}>Pay</Button>
      </div>
    </div>
  );
};

export default App;
