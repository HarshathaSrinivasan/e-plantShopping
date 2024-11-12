import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showPlants,setShowPlants] = useState(false);
  const [showCart, setShowCart] = useState(false); 

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.map(element => {
      let cost = element.cost;
      cost = cost.replace(/\D/g, "");
      totalCost += (element.quantity*cost);
    });
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    let {name,image,cost,quantity} = item;
    quantity = quantity+1;
    item = {name, image, cost,quantity };
    dispatch(updateQuantity(item));
  };

  const handleDecrement = (item) => {
    let {name,image,cost,quantity} = item;
    if(quantity > 0){
    quantity = quantity-1;
    }
    item = {name, image, cost,quantity };
    dispatch(updateQuantity(item));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleCheckout =(e)=>{
    console.log("Coming Soon...!!!");
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let itemCost = (item.cost.replace(/\D/g, ""))*(item.quantity);
    return itemCost;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckout(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


