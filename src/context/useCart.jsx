import CartContext from "./CartContext.jsx";
import { useContext } from "react";

function useCart() {
 
  const context = useContext(CartContext);
  if(!context) {
    throw new Error('useCart must be inside a cart provider');
  }
  return context;
}

export default useCart;
