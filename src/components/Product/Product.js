import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.handleAddProduct);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>

            <div>
                <h1 className="product-name"><Link to={"/product/" + key}>{name}</Link></h1>
                <p><small>by : {seller}</small></p>
                <p><small>$ {price}</small></p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                { props.showAddToCard && <button className="btn-cart" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;