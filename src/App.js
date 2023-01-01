import React, { useState, useEffect } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  // faPlus,
  // faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {Container , Card, Form, Button} from 'react-bootstrap'  


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
		console.log(newItems)
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

    const reloadWindow = () => {
    window.location.reload();
    };


  return (
    <div className="App">
      <Container fluid className="app-background">
        <h1 className="app-title">Shopping Budgeting App</h1>
        <div className="add-budget-box">
          <h1 className="instructions">
            Start by adding your budget for today
          </h1>
          <Form>
            <Form.Group
              className="mb-1 add-budget-box"
              controlId="formEnterBudget"
            >
              <Form.Control
                className="add-budget-input"
                type="input"
                placeholder="Type Budget"
                value={inputBudgetValue}
                onChange={(e) => setBudgetValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
				<h1 className="budget-message">{budgetMessage}</h1>
        <Card className="main-container">
          <Form className="add-item-form">
            <Form.Group className="mb-1" controlId="formEnterItem">
              <Form.Label className="text-dark">Add an Item to Your List</Form.Label>
              <Form.Control
                type="input"
                placeholder="Type Item"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="add-item-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnterCost">
              <Form.Label className="text-dark">How Much Does it Cost?</Form.Label>
              <Form.Control
                type="input"
                placeholder="Cost"
                value={priceInputValue}
                onChange={(e) => setPriceInputValue(e.target.value)}
                className="add-price-input"
              />
            </Form.Group>
            <Button
            className="button-effects"
            onClick={() => handleAddButtonClick()}
          >Add Item</Button>
          </Form>
					<div className="totals">
          <div className="total text-dark">Items: {totalItemCount}</div>
          <div className="total text-dark">
            Total $: <span className={priceColor}>{totalPriceCount}</span>
          </div>
          <div className="total text-dark">Budget: {inputBudgetValue}</div>
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
                <span className="quantity-integer"> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleQuantityIncrease(index)}
                  />
                </button>
              </div>
              {/* <button
                icon={faMinus}
                onClick={() => handleRemoveItemButtonClick()}>Remove
              </button> */}
            </div>
          ))}
        </div>
        </Card>
        <Button
            className="button-effects"
            onClick={() => reloadWindow()}
          >Erase Your List
      </Button>
      </Container>
    </div>
  );
};  

export default App;
