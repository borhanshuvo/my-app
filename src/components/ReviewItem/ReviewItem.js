import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className="review-item">
            <h5 className="product-name">{name}</h5>
            <p><small>Quantity : {quantity}</small></p>
            <p><small>Price : {price * quantity}</small></p>
            <button className="btn-cart" onClick={() => props.removeProduct(key)}> Remove </button>
        </div>
    );
};

export default ReviewItem;