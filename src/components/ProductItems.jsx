import useCart from "../context/UseCart";

function ProductItems({loading, search, showProducts, filteredProducts}) {
  const { dispatch } = useCart();
  return (
    <>
      {loading && (
        <div className="flex gap-2 justify-center mt-6">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      )}

      {!loading && search && filteredProducts.length === 0 && (
        <div>
          <p>No Results Found</p>
        </div>
      )}
      {showProducts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 justify-items-center w-full list-none">
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
                          src: product.src,
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
      )}
    </>
  );
}

export default ProductItems;
