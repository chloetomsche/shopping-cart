import products from "../products";
import useCart from "../context/UseCart";
import { useState, useEffect } from "react";

function ProductGrid({ selectedCategory }) {
  const { dispatch } = useCart();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      console.log("user is searching:..");
    }
  }, [search]);

  let filteredProducts;

  if (selectedCategory === "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  console.log("selectedCategory:", selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 justify-items-center w-full list-none">
      <input
        placeholder="search:"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {filteredProducts.map((product) => (
        <li>
          <div className="flex flex-col items-center border rounded-lg p-4 shadow-sm gap-3">
            <h1 className="text-2xl">{product.name}</h1>
            <img src={product.src} />
            <p>${product.price}</p>
            <div className="flex flex-row gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded-xs"
                onClick={() =>
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
  );
}

export default ProductGrid;
