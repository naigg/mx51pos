import React, { useState, useEffect } from "react";

// Styles
import "./OrderSummary.css";

// Components
import Button from "../Button";

const OrderSummary = ({
  summary,
  submitHandler,
  clearHandler,
  addItemHandler,
  removeItemHandler,
}) => {
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

  const renderButtons = () => {
    const isNotEmpty = filteredSummary.length > 0;
    return (
      <React.Fragment>
        <Button btnType="primary" disabled={!isNotEmpty} onClick={payHandler}>
          Pay
        </Button>
        <Button disabled={!isNotEmpty} onClick={clearHandler}>
          Clear
        </Button>
      </React.Fragment>
    );
  };

  return (
    <div className="app__right">
      <p>
        <strong>Order summary</strong>
      </p>
      <ul className="order-summary">
        {filteredSummary.map((item) => (
          <li className="order-summary__item" key={`${item.id}-${item.name}`}>
            <p>
              <button
                className="order-summary__button"
                onClick={() => removeItemHandler(item)}
              >
                -
              </button>
              {item.count}
              <button
                className="order-summary__button"
                onClick={() => addItemHandler(item)}
              >
                +
              </button>
            </p>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPay}</p>
      {renderButtons()}
    </div>
  );
};

export default React.memo(OrderSummary);
