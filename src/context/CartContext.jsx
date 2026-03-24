import {createContext} from 'react';
//step 1: creating the context. 
const CartContext = createContext(null);
//it has two parts, the first is the provider, the second part is the receiver.
 export default CartContext;