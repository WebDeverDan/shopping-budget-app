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
  const [items, setItems] = useState([ ]);
		const [inputValue, setInputValue] = useState('');
		const [priceInputValue, setPriceInputValue] = useState('');
		const [totalItemCount, setTotalItemCount] = useState(0);
		const [totalPriceCount, setTotalPriceCount] = useState(0);
		const [totalItemPrice, setItemTotalPrice] = useState(0);


		const handleAddButtonClick = () => {

			console.log (priceInputValue)
			const newPrice = parseInt(priceInputValue)
			console.log (newPrice)
			const newItem = {
				itemName: inputValue,
				quantity: 0,
				price: newPrice,
				total_price: totalItemPrice,
				isSelected: false
			};
			const newItems = [...items, newItem];
			console.log (newItems)

			setItems(newItems);
			setInputValue('');
			setPriceInputValue('')
			setItemTotalPrice()
			calculateTotal();
			calculateItemTotalPrice();
			calculateTotalPrice();
		};

	// 
		const handleQuantityIncrease = (index) => {
			const newItems = [...items];
			newItems[index].quantity++;
			setItems(newItems);
			calculateTotal();
			calculateItemTotalPrice();
			calculateTotalPrice();
		};
	// 
		const handleQuantityDecrease = (index) => {
			const newItems = [...items];
			newItems[index].quantity--;
			setItems(newItems);
			calculateTotal();
			calculateItemTotalPrice();
			calculateTotalPrice();
		};
// 
		const toggleComplete = (index) => {
			const newItems = [...items];
			newItems[index].isSelected = !newItems[index].isSelected;
			setItems(newItems);
		};
	// this works don't mess with it
		const calculateTotal = () => {
			const totalItemCount = items.reduce((item, total) => {
				return total + item.quantity;
			}, 0);
			setTotalItemCount(totalItemCount);
		};
	// math is working, but not updating on the item level - try something with the quantity handler
	const calculateItemTotalPrice = () => {
		const totalItemPrice = items.reduce((item, total) => {
			console.log (item)
			return total.quantity * total.price;
		}, 0);
		setItemTotalPrice(totalItemPrice)	
		};

		const calculateTotalPrice = () => {
			const totalPriceCount = items.reduce((item, total) => {
				console.log (total)
				return total * total;
			}, 0);
			setTotalPriceCount(totalPriceCount);
			};
		

  return (
    <div className="app-background">
      <div className="main-container">
							{/* input box */}
        <div className="add-item-box">
								<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='add-item-input' placeholder='Add an item |' />
								<input value={priceInputValue} onChange={(e) => setPriceInputValue(e.target.value)} className='add-item-input' placeholder='$' />
								<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
								</div>
								{/* list */}
        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div div className='item-name' onClick={() => toggleComplete(index)}>
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
              <div className="quantity">
                <button>
																<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                </button>
                <span> {item.quantity} </span>
                <button>
																<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                </button>
              </div>
            </div>
          ))}
        </div>
								<div className='total'>$: {totalPriceCount}</div>
								<div className='total'>Items: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
