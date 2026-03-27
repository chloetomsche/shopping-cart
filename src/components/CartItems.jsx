import useCart from "../context/UseCart";

function CartItems({
  handleDiscountButton,
  showCart,
  setShowCart,
  setCouponInput,
  couponMessage,
  showInput,
  handleApplyCoupon,
  couponInput,
}) {
  const { state, dispatch, cartCount, subTotal, discount } = useCart();

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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
            <h1 className="text-4xl text-left w-full">Cart:</h1>

            <div className="w-full flex flex-col gap-8">
              {state.items.map((item) => (
                <div key={item.id} className="w-full border-b pb-3">
                  <p className="pb-3 text-2xl">{item.name}</p>
                  <img src={item.src} className="pb-3"></img>
                  <p>
                    x{item.quantity}: ${item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

            {discount ? (
              <div>
                <h2 className="text-2xl text-left w-full">
                  Total: $ {subTotal - discount}
                </h2>
                <p>{couponMessage}</p>
              </div>
            ) : (
              <h2 className="text-2xl text-left w-full">Total: $ {subTotal}</h2>
            )}

            <div className="w-full flex flex-row justify-start gap-4">
              <button
                className="bg-blue-200 px-3 py-2 rounded-sm cursor-pointer hover:bg-blue-400"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Empty Cart
              </button>
              <button
                className="bg-green-300 px-3 py-2 rounded-sm hover:bg-green-500 cursor-pointer"
                onClick={handleDiscountButton}
              >
                Add Discount
              </button>
            </div>
            {showInput && (
              <div className="flex gap-8">
                <input
                  className="border-2 rounded-full px-2"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="enter coupon code:"
                ></input>
                <button
                  className="bg-red-600 px-2 py-1 rounded-sm text-white cursor-pointer hover:bg-red-700"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
            )}

            <button
              className="absolute top-3 right-4 border w-7 h-7 rounded-xs bg-gray-200 hover:bg-gray-400 cursor-pointer"
              onClick={() => setShowCart(false)}
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItems;
