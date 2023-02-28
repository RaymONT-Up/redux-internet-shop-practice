import { useDispatch, useSelector } from "react-redux";
import { mainActions } from "../../store/main-slice";
import styles from "./CartButton.module.css";

const CartButton = props => {
  const itemsQuantity = useSelector(state => state.cart.itemsQuantity);
  const dispatchFucntion = useDispatch();
  const toggleCartVisibilityHandler = () => {
    dispatchFucntion(mainActions.toggleCartVisibility());
  };
  return (
    <button className={styles.button} onClick={toggleCartVisibilityHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
