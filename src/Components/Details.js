import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";

export default class Details extends Component {
  render() {
    console.log("Details Page");
    return (
      <ProductConsumer>
        {(value) => {
          let {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart,
          } = value.detailProduct;
          console.log(id, company, img, info, price, title, inCart);
          // const titleV = JSON.stringify(title);
          return (
            <div className="container py-3">
              {/* Title */}
              <div className="row">
                <div className="col-10 mx-auto my-2 text-center text-blue">
                  <h1>{title} </h1>
                </div>
              </div>
              {/* Product img */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>modal : {title}</h2>
                  <h6 className="text-title text-muted mt-3 mb-2">
                    made by : {company}
                  </h6>
                  <h4 className="text-blue">
                    <strong>
                      Price : <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-weight-bold mt-3 mb-0">
                    some info about product :
                  </p>
                  <p className="text-muted lead">{info}</p>
                  {/* Buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to product</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "In Cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
