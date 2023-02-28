import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";

const ProductItem = props => {
  const reducerFunction = useDispatch();

  const addItemHandler = () => {
    reducerFunction(
      cartActions.addItem({
        id,
        title,
        price,
      })
    );
  };
  const { title, price, description, id } = props;

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
