import useCart from "../context/UseCart";
import { useCallback, useState, useEffect } from "react";
import CartItems from "./CartItems";

function Cart() {
  const { dispatch } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [showInput, setShowInput] = useState(false);

  const validCoupons = { save10: 10, save20: 20, save50: 50 };

  const handleApplyCoupon = useCallback(() => {
    const userInput = couponInput.trim().toLowerCase();
    if (validCoupons[userInput]) {
      dispatch({
        type: "APPLY_COUPON",
        payload: validCoupons[userInput],
      });
      setCouponMessage(`${validCoupons[userInput]}% Discount Applied`);
    } else {
      setCouponMessage("Invalid Coupon");
    }
  }, [couponInput, dispatch]);

  useEffect(() => {
    setCouponMessage("");
  }, [couponInput, dispatch]);

  const handleDiscountButton = () => {
    setShowInput(true);
  };

  return (
    <CartItems
      showCart={showCart}
      setShowCart={setShowCart}
      couponInput={couponInput}
      setCouponInput={setCouponInput}
      couponMessage={couponMessage}
      showInput={showInput}
      handleApplyCoupon={handleApplyCoupon}
      handleDiscountButton={handleDiscountButton}
    />
  );
}

export default Cart;
