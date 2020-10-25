import React, { Component } from "react";
// import CartItem from "./Components/Cart/CartItem";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Consumer
//Provider

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    // cart: storeProducts, //just for building cart component
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true; //tempProduct and product are referenced
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.price * product.count;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.price * product.count;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((cartItem) => cartItem.id !== id); //remove the product id
    const index = tempProducts.indexOf(this.getItem(id));
    let removedItem = tempProducts[index];
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState(
      () => {
        return { cart: tempCart, products: [...tempProducts] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] }; //this will not set the subtotal and totals to 0 and will not allow to add the same items in cart again. So a call back is used to set them freshly
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subtotal = 0;
    this.state.cart.map((item) => (subtotal += item.total));
    const temptax = subtotal * 0.1; //10% tax
    const tax = parseFloat(temptax.toFixed(2)); //return upto 2 decimal points
    const total = subtotal + tax;
    this.setState(
      () => {
        return { cartSubTotal: subtotal, cartTax: tax, cartTotal: total };
      },
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
