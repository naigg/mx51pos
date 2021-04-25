import React, { useState, useEffect } from "react";

// Styles
import "./OrderSummary.css";

// Components
import Button from "../Button";

const OrderSummary = ({ summary, submitHandler, clearHandler }) => {
  const [totalPay, setTotalPay] = useState(0);
  const [filteredSummary, setFilteredSummary] = useState([]);

  useEffect(() => {
    const pay = summary.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    setTotalPay(pay);
  }, [summary]);

  useEffect(() => {
    // Update summary and add a new value if item is already in the cart
    const newSummary = [
      ...summary
        .reduce((acc, curr) => {
          if (!acc.has(curr.id)) {
            acc.set(curr.id, { ...curr, count: 0 });
          }
          acc.get(curr.id).count++;
          return acc;
        }, new Map())
        .values(),
    ];
    setFilteredSummary(newSummary);
  }, [summary]);

  const payHandler = () => {
    const items = filteredSummary.reduce((acc, curr) => {
      acc.push(curr.name);
      return acc;
    }, []);
    submitHandler({ price: totalPay, items });
  };

  return (
    <div className="app__right">
      <p>Order summary</p>
      <ul className="order-summary">
        {filteredSummary.map((item) => (
          <li className="order-summary__item" key={`${item.id}-${item.name}`}>
            <p>
              <button>-</button>
              {item.count}
              <button>+</button>
            </p>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPay}</p>
      <Button btnType="primary" onClick={payHandler}>
        Pay
      </Button>
      {filteredSummary.length > 0 && (
        <Button onClick={clearHandler}>Clear</Button>
      )}
    </div>
  );
};

export default React.memo(OrderSummary);
