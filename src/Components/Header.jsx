import { useContext } from "react";
import logo from '../assets/logo.jpg'
import Button from "./UI/Button.jsx";
import cartContext from "../store/CartContext.jsx";
import userProgressContext from "../store/UserProgressContext.jsx";

function Header() {
    const cartCtx = useContext(cartContext);
    const userProgressCtx = useContext(userProgressContext)

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart()
    }

    return (
        <div id='main-header'>
            <div id="title">
                <img src={logo} alt="logo"/>
                <h1>Food order</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </div>
    );
}

export default Header;