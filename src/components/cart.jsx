import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContextProvider";
import "./cart.css";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // make sure this is present too
//stripe
import { loadStripe } from "@stripe/stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";

const stripePromise = loadStripe("pk_test_51RpoJe2LJVeGI7bH0iMFHvQ2vouY9V65JKUk3R4vCzZeQWYc1jEFNUXr0sAnJopVeuCZ9WYVDEbOFske8FN8RR8K004s42pDk7");

const Cart = () => {
  const { items } = useContext(StoreContext);
  const list = Object.values(items).filter(i => i.count > 0);
  const total = list.reduce((sum, i) => sum + i.price * i.count, 0);
  const [line, setLine] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const uploadData = async () => {
    try {
      const phone = sessionStorage.getItem("phone");
      console.log(phone);
      if (!phone) {
        window.alert("Login required to place order");
        return;
      }
      if (list.length === 0) {
        window.alert("Please select Items");
        return
      }
      //payments
      const functions = getFunctions();;
      const stripe = await stripePromise;
      const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");
      const totalAmount = total * 100; // Convert to paise

      //creation of payment way
      const res = await createPaymentIntent({ amount: totalAmount });
      const clientSecret = res.data.clientSecret;

      //stimulate payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Assuming you have set up CardElement

          billing_details: {
            name: phone,
          },
        }
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {

        const orderData = {
          phone,
          orderTime: serverTimestamp(),
          items: list.map((item) => ({
            name: item.name,
            size: item.selectedSize,
            quantity: item.count,
            price: item.price,
          })),
          address: {
            Line1: line,
            pincode,
            city,
            state: state,
          },
        };

        await addDoc(collection(db, "orders"), orderData);
        window.alert("Order placed ");
        alert("Placed Successfull")
        setLine('');
        setstate('');
        setcity('');
        setpincode('')
      }
    } catch (error) {
      console.error("Order Error:", error);
      window.alert("Failed to place order ❌");
    }
  };
  return (
    <div className="container_cart">
      <h2 className="heading">Cart</h2>
      {list.length === 0 ? <p>No items in Cart</p> : (
        <>
          <div className="wrapper">
            <table className="table_cart">
              <thead>
                <tr><th>Name</th><th>Size</th><th>Quantity</th><th>Price(₹)</th><th>SubTotal</th></tr>
              </thead>
              <tbody>
                {list.map(i => (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.selectedSize}</td>
                    <td>{i.count}</td>
                    <td>{i.price}</td>
                    <td>{i.price * i.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="address">
            <p style={{ textAlign: "center" }}>Address </p>
            <form>
              <div className="address1">
                <label id="line1" >Line1</label>
                <input placeholder="Enter Line1" type="text" name="line1" value={line} onChange={(e) => setLine(e.target.value)} />

                <label id="pincode" >Pincode</label>
                <input type="text" inputMode="numeric" placeholder="Pincode" name="pincode" value={pincode} maxLength={6} onChange={(e) => setpincode(e.target.value)} minLength={6} />
              </div>
              <div className="address2">
                <label id="city">City</label>
                <input type="text" placeholder="City" name="city" value={city} onChange={(e) => setcity(e.target.value)} />
                <label htmlFor="state"></label>
                <input type="text" placeholder="State" name="state" value={state} onChange={(e) => setstate(e.target.value)} />
              </div>
            </form>
          </div>
        </>

      )}
      <h3>Total: ₹{total}</h3>
      <div className="payment">
        <button onClick={() => uploadData()}>Pay</button>
      </div>
    </div>
  );
};

export default Cart;
