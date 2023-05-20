import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
      postalCode: postalCode,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section className="ml-5">
        <h6 className="mb-4">Shipping Address</h6>
        <form className="gap-3" onSubmit={submitHandler}>
          <div className="  ">
            <input
              type="text"
              placeholder="Enter your name"
              required
              onChange={(e) => setEnterName(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="form__group">
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEnterEmail(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="form__group">
            <input
              type="number"
              placeholder="Phone number"
              required
              onChange={(e) => setEnterNumber(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="form__group">
            <input
              type="text"
              placeholder="Country"
              required
              onChange={(e) => setEnterCountry(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="form__group">
            <input
              type="text"
              placeholder="City"
              required
              onChange={(e) => setEnterCity(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="form__group">
            <input
              type="number"
              placeholder="Postal code"
              required
              onChange={(e) => setPostalCode(e.target.value)}
              className="flex mb-2 border-b-2 p-1 focus:outline-none  border-fuchsia-300 rounded-full"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h6 className="flex gap-2  mb-3">
              Subtotal: <span className="text-red-400">${cartTotalAmount}</span>
            </h6>
            <h6 className="flex gap-2 mb-3">
              Shipping: <span className="text-red-400">${shippingCost}</span>
            </h6>
            <div className="checkout__total">
              <h5 className="flex gap-2">
                Total: <span className="text-red-400">${totalAmount}</span>
              </h5>
            </div>
            <button className="text-2xl bg-red-400 p-1 rounded-xl mt-2 hover:bg-red-700 hover:scale-110">
              Order
            </button>
          </div>
        </form>
      </section>
    </Helmet>
  );
};

export default Checkout;
