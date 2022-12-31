import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";


const App = () => {
  const [items, setItems] = useState([]);
  const [inputBudgetValue, setBudgetValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [priceInputValue, setPriceInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPriceCount, setTotalPriceCount] = useState(0);
  const [totalItemPrice, setItemTotalPrice] = useState(0);
  const [priceColor, setPriceColorClass] = useState("regular-price");
  const [budgetMessage, setBudgetMessage] = useState(
    "preparing to keep you in budget..."
  );

  // add new item
  const handleAddButtonClick = () => {
    const newPrice = parseInt(priceInputValue);
    const newItem = {
      itemName: inputValue,
      quantity: 0,
      price: newPrice,
      total_price: totalItemPrice,
      isSelected: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue("");
    setPriceInputValue("");
    setItemTotalPrice();
    calculateTotal();
    calculateTotalPrice();
  };

  // increase quantity
  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    const indexItem = newItems[index];
    indexItem.quantity++;
    indexItem.total_price = indexItem.quantity * indexItem.price;
    setItems(newItems);
    setItemTotalPrice();
    calculateTotal();
    calculateTotalPrice();
  };

  // decreate quantity
  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    const indexItem = newItems[index];
    indexItem.quantity--;
    indexItem.total_price = indexItem.quantity * indexItem.price;
    setItems(newItems);
    setItemTotalPrice();
    calculateTotal();
    calculateTotalPrice();
  };

  // toggle complete feature
  const toggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };

  // this works don't mess with it
  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setTotalItemCount(totalItemCount);
  };

  // this works don't mess with it
  const calculateTotalPrice = () => {
    const itemArr = items;

    let totalPriceCount = 0;

    itemArr.forEach((total) => {
      totalPriceCount += total.total_price;
    });
    setTotalPriceCount(totalPriceCount);

    let priceColor = {
      color: "green",
    };
    if (totalPriceCount > inputBudgetValue) {
      priceColor = "over-budget";
    } else {
      priceColor = "under-budget";
    }
    setPriceColorClass(priceColor);
    let budgetMessage;
    if (totalPriceCount > inputBudgetValue) {
      budgetMessage = "OH GOSH! You're over budget!";
    } else {
      budgetMessage = "Excellent job staying within your budget!";
    }

    setBudgetMessage(budgetMessage);
  };

  return (
    <div className="app-background">
      <h1 className="app-title">Shopping Budgeting App</h1>
      <div className="add-budget-box">
        <h1 className="instructions">Start by adding your budget for today</h1>
        <input
          value={inputBudgetValue}
          onChange={(e) => setBudgetValue(e.target.value)}
          className="add-budget-input"
          placeholder="What's your budget?"
        />
      </div>
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="add-item-input"
            placeholder="Type Item"
          />
          <input
            value={priceInputValue}
            onChange={(e) => setPriceInputValue(e.target.value)}
            className="add-price-input"
            placeholder="Type Cost"
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div
                div
                className="item-name"
                onClick={() => toggleComplete(index)}
              >
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div>$ {item.price * item.quantity}</div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => handleQuantityDecrease(index)}
                  />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="totals">
          <div className="total">Items: {totalItemCount}</div>
          <div className="total">
            Total $: <span className={priceColor}>{totalPriceCount}</span>
          </div>
          <div className="total">Budget: {inputBudgetValue}</div>
        </div>
      </div>
      <h1 className="budget-message">{budgetMessage}</h1>
    </div>
  );
};

export default App;
