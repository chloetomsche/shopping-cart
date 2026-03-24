import useCart from "../context/UseCart";
import { useState } from "react";
import discounts from "../discounts";

function Cart() {
  const { state, dispatch, cartCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="flex flex-row justify-center gap-12">
      <div className="relative ">
        <button
          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md w-24 h-12 text-white"
          onClick={() => setShowCart(true)}
        >
          <p className="absolute bg-red-700 -top-3 left-19 px-2 rounded-sm ">
            {cartCount}
          </p>
          My Cart
        </button>
      </div>

      {showCart && (
        <div className="flex flex-col items-center relative gap-4 border rounded-md p-6 shadow-sm max-w-md">
          <h1 className="text-3xl">Cart:</h1>

          <div className="grid grid-flow-row grid-cols-4 gap-4 px-4">
            {state.items.map((item) => (
              <li>
                <p>{item.name}:</p>
                <p>
                  x{item.quantity}: ${item.quantity * item.price}
                </p>
              </li>
            ))}
          </div>

          <div className="flex flex-row justify-center gap-8">
            <h2 className="text-2xl">
              Total: $
              {state.items.reduce((accumulator, current) => {
                const price = current.price * current.quantity;
                return accumulator + price;
              }, 0)}
            </h2>

            <button
              className="bg-blue-200 px-2 rounded-sm cursor-pointer hover:bg-blue-400"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Empty Cart
            </button>
            <button className="bg-green-300 px-2 rounded-sm hover:bg-green-500 cursor-pointer">
              Add Discount
            </button>
          </div>
          <button
            className="absolute top-3 right-4 border w-7 h-7 rounded-xs bg-gray-200 hover:bg-gray-400 cursor-pointer"
            onClick={() => setShowCart(false)}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
