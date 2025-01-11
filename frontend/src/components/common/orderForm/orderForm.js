import React, { useState } from "react";
import styles from './orderForm.module.scss';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addClientRequest } from "../../../redux/clientRedux";
import { addOrderRequest } from "../../../redux/orderRedux";
import { getCart } from "../../../redux/cartRedux";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/cartRedux";

const OrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', phoneNr: '', comment: '' });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const cart = useSelector(getCart);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOrderFormSend = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            if (/\d/.test(formData.name)) {
                setError('Name cannot contain numbers.');
                return;
            }
            if (!/^\d+$/.test(formData.phoneNr)) {
            setError('Please enter a valid phone number.');
            return;
            }
            if (formData.comment.length > 400) {
            setError('Comment cannot exceed 400 characters.');
            return;
            }
            const clientData = {
            name: formData.name,
            email: formData.email,
            phoneNr: parseInt(formData.phoneNr)
            };
            const uniqueOrderId = uuid();
            const client = await dispatch(addClientRequest(clientData));
            const orderItems = cart.products.map(product => ({
            orderId: uniqueOrderId,
            productId: product.productId,
            quantity: product.quantity,
            basePrice: product.basePrice,
            totalPrice: product.totalPrice,
            productOption: product.option,
            comment: product.comment || ''
            }));
            const order = {
            id: uniqueOrderId,
            clientId: client.id,
            totalPrice: cart.totalCost,
            comment: formData.comment,
            orderItems: orderItems,
            totalItems: cart.itemsInCart,
            };
            await dispatch(addOrderRequest(order));
            setMessage('Order placed successfully! We will contact you shortly.');
            setIsSubmitted(true);
            dispatch(clearCart());
        } catch (e) {
            setError(`Error placing order: ${e.message}`);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.orderFormContainer}>
            {message && <Alert className={styles.alertSuccess}>{message}</Alert>}
            {error && <Alert className={styles.alertDanger}>{error}</Alert>}
            {!isSubmitted ? (
                <Form className={styles.OrderForm} onSubmit={handleOrderFormSend}>
                    <Form.Group controlId="formName" className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Name</Form.Label>
                        <Form.Control className={styles.formControl}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Email</Form.Label>
                        <Form.Control className={styles.formControl}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNr" className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>Phone Number</Form.Label>
                        <Form.Control className={styles.formControl}
                            type="text"
                            name="phoneNr"
                            value={formData.phoneNr}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formComment" className={styles.formGroup}>
                        <Form.Label className={styles.formLabel}>
                            Comment
                            <span className={styles.restriction}>max 400 characters.</span>
                        </Form.Label>
                        <Form.Control as="textarea" className={`${styles.formControl} ${styles.formControlComment}`}
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            maxLength="400"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className={styles.submitButton}>
                        Submit Order
                    </Button>
                </Form>
            ) : (
                <Button variant="primary" onClick={handleBackToHome} className={styles.homePageBtn}>
                    Back to Home Page
                </Button>
            )}
        </div>
    );
};

export default OrderForm;