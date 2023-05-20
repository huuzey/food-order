import React from "react";

import "../../../styles/product-card.css";

// import productImg from "../../../assets/images/product_2.1.jpg";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  const { _id, title, photo, price, desc, extraIngredients } = item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        photo,
        price,
        desc,
        extraIngredients,
      })
    );
  };

  return (
    <div className=" w-1/5 lg:mx-4 md:mx-2 sm:mx-1 shadow-xl my-2 flex flex-col cards  ">
      <img
        className=" w-[30%] flex items-center justify-center self-center hover:scale-110"
        src={photo[0]}
        alt="Pizza"
      />

      <h5 className="flex items-center justify-center mt-1 sm:text-sm md:text-sm">
        <Link to={`/pizzas/${_id}`}>{title}</Link>
      </h5>

      <div className="flex items-center justify-between">
        <span className="product__price ml-2">{price} € </span>
        <button
          className="bg-red-400 text-sm rounded-full p-1 m-1 hover:bg-red-600 hover:scale-105"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
