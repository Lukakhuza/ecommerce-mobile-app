import { createContext, useContext, useEffect, useState } from "react";
import { UserInputContext } from "./userInputContext";

export const CartContext = createContext({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
});

function CartContextProvider({ children }) {
  const userInputCtx = useContext(UserInputContext);
  const [cartItems, setCartItems] = useState(userInputCtx.input.cart.items);

  useEffect(() => {
    setCartItems(userInputCtx.input.cart.items);
  }, [userInputCtx.input.cart.items]);

  function addItem(item) {
    setCartItems((currentCartItems) => {
      const index = currentCartItems.findIndex((selectedItem) => {
        if (item._id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let updatedCartItems = currentCartItems.map((c, i) => {
        if (i === index) {
          const updatedItem = {
            _id: c._id,
            product: c.product,
            quantity: c.quantity + 1,
          };
          return updatedItem;
        } else {
          return c;
        }
      });
      console.log("Test 7", updatedCartItems);
      return updatedCartItems;
    });
    return cartItems;
  }

  function removeItem(id) {
    setCartItems((currentCartItems) => {
      const index = currentCartItems.findIndex((selectedItem) => {
        if (id === selectedItem._id) {
          return true;
        } else {
          return false;
        }
      });
      let updatedCartItems = currentCartItems.map((c, i) => {
        if (i === index) {
          if (c.quantity > 1) {
            const updatedItem = {
              _id: c._id,
              product: c.product,
              quantity: c.quantity - 1,
            };
            return updatedItem;
          } else {
            return c;
          }
        } else {
          return c;
        }
      });
      return updatedCartItems;
    });
  }

  const value = {
    cartItems: cartItems,
    addItem: addItem,
    removeItem: removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContextProvider;
