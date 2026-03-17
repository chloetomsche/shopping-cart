import { useState, useReducer, useContext } from "react";
import placeholder from "../src/assets/images/placeholder.avif";

function App() {
  const products = [
    {
      id: 0,
      name: "Cowboy Boots",
      price: 76,
      category: "Shoes",
      src: placeholder,
    },
    {
      id: 1,
      name: "Baseball Cap",
      price: 24,
      category: "Hats",
      src: placeholder,
    },
    {
      id: 2,
      name: "Gloves",
      price: 16,
      category: "Assessories",
      src: placeholder,
    },
    {
      id: 3,
      name: "Sneakers",
      price: 67,
      category: "Shoes",
      src: placeholder,
    },
    {
      id: 4,
      name: "Sunglasses",
      price: 20,
      category: "Assessories",
      src: placeholder,
    },
    {
      id: 5,
      name: "Beanie",
      price: 17,
      category: "Hats",
      src: placeholder,
    },
    {
      id: 6,
      name: "Necklace",
      price: 26,
      category: "Assessories",
      src: placeholder,
    },
    {
      id: 7,
      name: "Earrings",
      price: 21,
      category: "Assessories",
      src: placeholder,
    },
    {
      id: 8,
      name: "Hoodie",
      price: 54,
      category: "Clothing",
      src: placeholder,
    },
  ];
  //function reducer(state, action) {if action is this, then change the state to new state}
  const initialCartState = { items: [] };
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

  return (
    <div className="min-h-screen w-full flex justify-center px-6 py-10">
      <div className="w-full max-w-7xl flex flex-col items-center gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 justify-items-center w-full list-none">
          {products.map((product) => (
            <li>
              <div className="flex flex-col items-center border rounded-lg p-4 shadow-sm gap-3">
                <h1 className="text-2xl">{product.name}</h1>
                <img src={product.src} />
                <p>${product.price}</p>
                <div className="flex flex-row gap-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded-xs"
                    onClick={() =>
                      //when the user clicks the add button, the dispatch function sends an action object with the data for the specific product button that was clicked and the type of action that the reducer will use to update the state
                      dispatch({
                        type: "ADD_ITEM",
                        payload: {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                        },
                      })
                    }
                  >
                    +
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-500 px-2 py-1 rounded-xs"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: { id: product.id },
                      })
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            </li>
          ))}
        </div>
        <div className="flex flex-row justify-center gap-12">
          <button
            className="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md w-24 h-12 text-white"
          >
            My Cart
          </button>
          <div className="flex flex-col items-center gap-4 border rounded-md p-6 shadow-sm max-w-md">
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

            <div className="flex flex-row justify-center gap-22">
              <h2 className="text-2xl">
                Total: $
                {state.items.reduce((accumulator, current) => {
                  const price = current.price * current.quantity;
                  return accumulator + price;
                }, 0)}
              </h2>
              <button
                className="bg-blue-200 px-2 rounded-sm"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
