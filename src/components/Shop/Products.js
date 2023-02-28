import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "1",
    price: 7,
    title: `Супер товар 1`,
    description: `Супер товар 1 с чудесным качеством 1`,
  },
  {
    id: "2",
    price: 4,
    title: `Супер товар 2`,
    description: `Супер товар 2 с чудесным  `,
  },
  {
    id: "3",
    price: 3,
    title: `Супер товар 3`,
    description: `Супер товар 3 с чудесным качеством `,
  },
];

const Products = props => {
  const productsItems = DUMMY_ITEMS.map(item => {
    return (
      <ProductItem
        title={item.title}
        price={item.price}
        description={item.description}
        key={item.id}
        id={item.id}
      />
    );
  });

  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>{productsItems}</ul>
    </section>
  );
};

export default Products;
