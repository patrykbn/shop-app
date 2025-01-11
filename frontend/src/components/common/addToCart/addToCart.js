import React, { useState } from "react";
import styles from "./addToCart.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart } from '../../../redux/cartRedux';
import { v4 as uuid } from 'uuid';

const AddToCart = ({ productPrice, productId, selectedOption }) => {
    const basePrice = productPrice;
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(productPrice);
    const [fade, setFade] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentInput, setShowCommentInput] = useState(false);
    const dispatch = useDispatch();
    
    const handleLessQuantity = () => {
        if (quantity <= 1) {
            setQuantity(1);
            setPrice(basePrice * quantity);
        }
        else {
            setQuantity(quantity - 1);
            setPrice(basePrice * (quantity - 1));
        }
    };
    const handleMoreQuantity = () => {
        if (quantity >= 10) {
            setQuantity(10);
            setPrice(basePrice * quantity);
        }
        else {
            setQuantity(quantity + 1);
            setPrice(basePrice * (quantity + 1));
        }
    };
    const handleAddComment = () => {
        setShowCommentInput(true);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    const handleAddToCart = () => {
        setFade(true);
        setTimeout(() => {
            setFade(false);
          }, 600); //timeout should match css transition
          setTimeout(() => {
            setQuantity(1);
            setPrice(basePrice)
          }, 800);

          const product = {
            id: uuid(), // generate a unique ID
            productId,
            quantity,
            basePrice,
            totalPrice: price,
            option: selectedOption || [],
            comment: comment
        };
        
        console.log(selectedOption);
        dispatch(addToCart(product));
        setShowCommentInput(false);
        setComment('');
    }

    return (
        <div className={styles.addToCartContainer}>
            <div className={styles.top}>
                <span className={styles.priceText}>total:</span>
                <span className={styles.price}>${price}</span>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityButton} onClick={handleLessQuantity}>-</div>
                    <div className={styles.quantity}>{quantity}pc.</div>
                    <div className={styles.quantityButton} onClick={handleMoreQuantity}>+</div>
                </div>
                <div className={styles.cartButtonContainer} onClick={handleAddToCart}>
                    <span className={styles.cartText}>Add to cart</span>
                    <div className={styles.cartIconContainer}>
                        <FontAwesomeIcon icon={faCartShopping} className={styles.cartIcon} />
                        <span className={`${styles.addPrice} ${fade === true ? styles.fade : ''}`}>+${price}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <button 
                    className={`${styles.addCommentButton} ${showCommentInput ? styles.hidden : ''}`} 
                    onClick={handleAddComment}
                >
                    Add comment to product order
                </button>
                {showCommentInput && (
                    <div className={styles.commentInputContainer}>
                        <textarea
                            className={styles.commentInput}
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add your comment here and add to cart"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCart;