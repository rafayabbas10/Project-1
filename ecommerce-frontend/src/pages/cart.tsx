import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc"
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
   productId: "xyzz",
   photo: "https://m.media-amazon.com/images/I/71PDemSILJL._AC_SY695_.jpg",
   name: "Red Perl Necklace",
   price: 3500,
   quantity: 4,
   stock: 50,
  }

];

const subtotal = 3500;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 400;
const total = subtotal + tax + shippingCharges;
const discount = 400;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if(Math.random()>0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    }, 1000); 
    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    }
  }, [couponCode])

  return (
    <div className='cart'>
      <main>

        {
          cartItems.length > 0 ? (cartItems.map((i,idx) => (<CartItem key={idx} cartItem={i} />)
          )) : (<h1>No Items Added</h1>)
        }

      </main>
      <aside>
        <p>Subtotal: {subtotal} rs</p>
        <p>Shipping Charges: {shippingCharges} rs</p>
        <p>Tax: {tax} rs</p>
        <p>
          Discount: <em className="red">
            - {discount} rs
          </em>
        </p>
        <p>
          <b>Total: {total} rs</b>
        </p>
        <input type="text" placeholder="Enter Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

        {couponCode && (
          isValidCouponCode ? (<span className="green">{discount}rs off using the <code>{couponCode}</code></span>) : (<span className="red">Invalid Coupon Code <VscError /></span>
          )
        )}

        {
          cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>
        }

      </aside>
    </div>
  )
}

export default Cart