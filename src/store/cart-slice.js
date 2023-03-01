import { createSlice } from "@reduxjs/toolkit";
import { mainActions } from "./main-slice";

const cartInitialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addItem(state, action) {
      state.itemsQuantity++;
      state.isCartContentChanged = true;

      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItem(state, action) {
      state.itemsQuantity--;
      state.isCartContentChanged = true;

      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQuantity = action.payload.itemsQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export const sendCartData = cartData => {
  return async dispatchAction => {
    dispatchAction(
      mainActions.showStatusMessage({
        status: `pending`,
        title: "Отправка данных",
        message: "Данные корзины отправляются на сервер...",
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://default-todo-e3713-default-rtdb.firebaseio.com/redux-cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            itemsQuantity: cartData.itemsQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных корзины");
      }
    };

    try {
      await sendDataHttpRequest();
      dispatchAction(
        mainActions.showStatusMessage({
          status: "success",
          title: "Отправка данных успешна",
          message: "Данные корзины отправлены на сервер",
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: "error",
          title: "Ошибка запроса",
          message: "Данные не отправленны на сервер :(",
        })
      );
    }
  };
};
export const getCartData = () => {
  return async dispatchAction => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        "https://default-todo-e3713-default-rtdb.firebaseio.com/redux-cart.json"
      );

      if (!response.ok) {
        throw new Error("Невозможно извлечь данные о корзине с сервера :(");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartActions.updateCart({
          itemsQuantity: cartData.itemsQuantity,
          items: cartData.items || [],
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: `error`,
          title: "Ошибка получения данных с сервера",
          message: "Невозможно извлечь данные о корзине с сервера :(",
        })
      );
    }
  };
};

export default cartSlice;
