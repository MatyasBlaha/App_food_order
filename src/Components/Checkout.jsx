import Modal from "./UI/Modal.jsx";
import {useContext} from "react";
import cartContext from "../store/CartContext.jsx";
import {currencyFormatter} from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import userProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./UI/Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};
const url = 'http://localhost:3000/orders';

function Checkout() {
    const cartCtx = useContext(cartContext)
    const userProgressCtx = useContext(userProgressContext);

    const {
        data,
        idLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp(url, requestConfig)

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleReturnToCart() {
        userProgressCtx.hideCheckout();
        userProgressCtx.showCart();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    let actions = (
        <>
            <Button type='button' onClick={handleReturnToCart} textOnly>Close</Button>
            <Button>Submit Order</Button></>
    )

    if(isSending){
        actions = <span>Sending order...</span>
    }

    if(data && !error){
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more detail via email within few minutes.</p>
            <p className='modal-actions'><Button onClick={handleFinish}>Okay</Button></p>
        </Modal>
    }

    return (
        <>
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleReturnToCart}>
                <form onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                    <Input label='Full Name' type='text' id='name'/>
                    <Input label='E-Mail address Name' type='email' id='email'/>
                    <Input label='Streer' type='text' id='street'/>
                    <div className='control-row'>
                        <Input label='Postal Code' type='text' id='postal-code'/>
                        <Input label='City' type='text' id='city'/>
                    </div>

                    {error && <Error title='Failed to submit order.' message={error}/>}

                    <p className='modal-actions'>{actions}</p>
                </form>
            </Modal>
        </>
    );
}

export default Checkout;