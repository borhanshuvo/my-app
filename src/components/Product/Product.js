import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    //console.log(props.handleAddProduct);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
                <h1 className="product-name">{name}</h1>
                <p><small>by : {seller}</small></p>
                <p><small>$ {price}</small></p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button className="btn-cart" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;