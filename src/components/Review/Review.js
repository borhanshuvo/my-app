import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import haapyImage from '../../images/giphy.gif';
import './Review.css';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const placeOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map ( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    },[]);
 
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={haapyImage} alt=""/>;
    } 

    return (
        <div className="shop-container">
            <div className="product-container ">
                
                {
                    cart.map ( pd=> <ReviewItem product={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem> )
                }
                <div className="image-container">
                    {thankYou}
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={placeOrder} className="btn-cart">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;