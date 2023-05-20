import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from "../components/ExtraIngredient/ExtraIngredient.jsx";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector } from "react-redux";

import "../styles/product-details.css";
import "../styles/product-card.css";

import ProductCard from "../components/UI/product-card/ProductCard";

const ExtraIngredients = {
  MUSHROOMS: "Mushrooms",
  ONION: "Onion",
  PEPPER: "Pepper",
  PINAPPLE: "Pinapple",
  TUNA: "Tuna",
  MEAT: "Meat",
  CHEESE: "Cheese",
  HOTSAUCE: "Hot Sauce",
  CORN: "Corn",
};

const PizzaDetails = () => {
  const products = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [isUpdateNotificationDisplayed, setIsUpdateNotificationDisplayed] =
    useState(false);
  const product = products?.products?.find((product) => product._id === id);
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const { title, price, category, desc, photo } = product;
  const [previewImg, setPreviewImg] = useState(photo);
  const relatedProduct = products?.products?.filter(
    (item) => category === item.category
  );

  useEffect(() => {
    const existingPizza = cartProducts.find((item) => item._id === id);
    if (existingPizza) {
      setExtraIngredients(existingPizza.extraIngredients);
    } else {
      setExtraIngredients([]);
    }
  }, [cartProducts, id]);

  const addItem = () => {
    setIsUpdateNotificationDisplayed(true);
    setTimeout(function () {
      setIsUpdateNotificationDisplayed(false);
    }, 3000);

    dispatch(
      cartActions.addItem({
        _id: id,
        title,
        price,
        photo,
        extraIngredients,
      })
    );
  };

  useEffect(() => {
    setPreviewImg(photo);
    window.scrollTo(0, 0);
  }, [product]);

  function updateExtraIngredients(ingredient) {
    if (extraIngredients.includes(ingredient)) {
      setExtraIngredients(
        extraIngredients.filter((item) => item !== ingredient)
      );
    } else {
      setExtraIngredients((previousState) => [...previousState, ingredient]);
    }
  }

  return (
    <Helmet title="Product-details">
      {isUpdateNotificationDisplayed && (
        <div className="updateCartNotifiation">
          <span>You successfully updated your cart!</span>
        </div>
      )}

      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div
                className="img__item mb-3"
                onClick={() => setPreviewImg(photo)}
              >
                <img src={photo} alt="" className="w-50" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCART__btn">
                  {cartProducts.find((item) => item._id === id)
                    ? "Update Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="extraIngredientsGrid">
                {Object.values(ExtraIngredients).map((ingredient) => {
                  return (
                    <ExtraIngredient
                      isChecked={extraIngredients?.includes(ingredient)}
                      key={ingredient}
                      onSelect={(ingredient) =>
                        updateExtraIngredients(ingredient)
                      }
                      ingredient={ingredient}
                    ></ExtraIngredient>
                  );
                })}
              </div>
            </Col>

            <Col lg="12">
              <h6 className="description">Description</h6>
              <div className="description__content">
                <p>{desc}</p>
              </div>
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <ProductCard item={item} />
            ))}
          </Row>
        </Container>
      </section>
      <p>
        <Link to={"/map"}>Map</Link>
      </p>
    </Helmet>
  );
};

export default PizzaDetails;
