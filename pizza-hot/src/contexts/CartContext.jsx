import { createContext, useReducer } from "react";
import  cartReducer  from "../reducers/cartReducer";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {items: []});
;

  //add item to cart
  const addItemToCart = (item) => {
    dispatch({ type: "ADD_ITEM", item });
  };

  //update cart items
  const updateCartItem = () => {};

  //delete cart item
  const deleteCartItem = (id) => {
    dispatch({type : "REMOVE_ITEM", id})
  };

  //Clear all cart items
  const clearCart = () => {};

  const cartContext = {
    items: cart.items,
    addItemToCart,
    deleteCartItem,
    // updateCartItem,
    // clearCart,
  }

  console.log(cartContext);

  return (
    <CartContext.Provider
      value={cartContext}
    >
      {children}
    </CartContext.Provider>
  );
};
