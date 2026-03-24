import CartContext from "./CartContext";
import { useReducer, useMemo } from "react";
function CartProvider({ children }) {
  //function reducer(state, action) {if action is this, then change the state to new state}
  const initialCartState = { items: [], coupon: 1 };
  const [state, dispatch] = useReducer(reducer, initialCartState);

  //all the different actions to update state
  function reducer(cartState, action) {
    switch (action.type) {
      //first find if the product we want to add to our items array already exists. if exists, we keep the content from the item object and update the value of the already defined quantity key to add 1. if the the product id doesnt match any ids in the items array, we add a new item object with a quantity key and a value of 1
      case "ADD_ITEM":
        const existentItem = cartState.items.find(
          (item) => item.id === action.payload.id
        );
        if (existentItem) {
          return {
            items: cartState.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return {
          items: [...cartState.items, { ...action.payload, quantity: 1 }],
        };

      case "REMOVE_ITEM":
        // we are checking the items array to see if an item object has a id that matches the product id we dispatched a action on. if there's a match, we check to see if the quantity is 1, and if it is, we filter out that item in the items array. if quantity is not 1, we create a new item object with {...item} and then updating the quantity
        const matchedItem = cartState.items.find(
          (item) => item.id === action.payload.id
        );

        if (matchedItem) {
          if (matchedItem.quantity === 1) {
            return {
              items: cartState.items.filter(
                (item) => item.id !== action.payload.id
              ),
            };
          } else {
            return {
              items: cartState.items.map((item) =>
                item.id === action.payload.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
        } else {
          return cartState;
        }

      //if there are any items within the items array, we clear the cart by returning an empty array like the original cart default
      case "CLEAR_CART":
        if (cartState.items) {
          return {
            items: [],
          };
        }

      default:
        return cartState;
    }
  }

  const cartCount = useMemo(
    () =>
      state.items.reduce(
        (previousValue, currentItem) => previousValue + currentItem.quantity,
        0
      ),
    [state.items]
  );

  const subTotal = useMemo(
    () =>
      state.items.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.quantity * currentValue.price,
        0
      ),
    [state.items]
  );

  const discount = useMemo(() => {
    if (!state.coupon) {
      return 0;
    }
    return (subTotal * state.coupon) / 100;
  }, [state.coupon, subTotal]);

  const value = { state, dispatch, cartCount, subTotal, discount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
