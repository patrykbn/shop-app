import React, { useState } from "react";
import styles from './quantityWidget.module.scss';
import { useDispatch } from "react-redux";
import { updateProductQuantity } from '../../../redux/cartRedux';

const QuantityWidget = ({ orderItemId, quantity }) => {
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleLessQuantity = () => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(updateProductQuantity({ id: orderItemId, quantity: newQuantity }));
        }
    };

    const handleMoreQuantity = () => {
        if (currentQuantity < 10) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);
            dispatch(updateProductQuantity({ id: orderItemId, quantity: newQuantity }));
        }
    };

    return (
        <div className={styles.quantityWidgetContainer}>
            <div className={styles.quantityWidget}>
                <button className={styles.quantityButton} onClick={handleLessQuantity}>-</button>
                <span className={styles.quantityDisplay}>{currentQuantity}pc.</span>
                <button className={styles.quantityButton} onClick={handleMoreQuantity}>+</button>
            </div>
        </div>
    );
}

export default QuantityWidget;