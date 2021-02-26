import React, { useState, useEffect } from "react";
import "./Car.scss";
import { Button } from "react-bootstrap";
import { ReactComponent as CarEmpty } from "../../assets/img/cart-empty.svg";
import { ReactComponent as CarFull } from "../../assets/img/cart-full.svg";
import { ReactComponent as CloseIcon } from "../../assets/img/close.svg";
import { ReactComponent as CleanCar } from "../../assets/img/garbage.svg";
import { BASE_PATH, STORAGE_PRODUCTS_CAR } from "../../utils/constants";
import {
  removeArrayDuplicates,
  countDuplicateItemArray,
  removeItemArray,
} from "../../utils/arrayFunc";

export default function Car(props) {
  const { productsCar, getProductsCar, products } = props;
  const [carOpen, setCarOpen] = useState(false);
  const widthCarContent = carOpen ? 400 : 0;
  const [singleProductsCar, setSingleProducstCar] = useState([]);

  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCar);
    setSingleProducstCar(allProductsId);
  }, [productsCar]);

  const openCar = () => {
    setCarOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCar = () => {
    setCarOpen(false);
    document.body.style.overflow = "scroll";
  };

  const cleanCar = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CAR);
    getProductsCar();
  };

  const increaseQuantity = (id) => {
    const arrayItems = productsCar;
    arrayItems.push(id);
    localStorage.setItem(STORAGE_PRODUCTS_CAR, arrayItems);
    getProductsCar();
  };

  const decreaseQuantity = (id) => {
    const arrayItems = productsCar;
    const result = removeItemArray(arrayItems, id.toString());
    localStorage.setItem(STORAGE_PRODUCTS_CAR, result);
    getProductsCar();
  };

  return (
    <>
      <Button varian="link" className="car">
        {productsCar.length > 0 ? (
          <CarFull onClick={openCar} />
        ) : (
          <CarEmpty onClick={openCar} />
        )}
      </Button>
      <div className="car-content" style={{ width: widthCarContent }}>
        <CardContentHeader
          closeCar={closeCar}
          cleanCar={cleanCar}
        ></CardContentHeader>
        <div className="car-content__products">
          {singleProductsCar.map((idProductsCar, index) => (
            <CardContentProduct
              key={index}
              products={products}
              idProductsCar={productsCar}
              idProductCar={idProductsCar}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            ></CardContentProduct>
          ))}
        </div>
        <CarContentFooter carTotalPrice={1}></CarContentFooter>
      </div>
    </>
  );
}

function CardContentHeader(props) {
  const { closeCar, cleanCar } = props;
  return (
    <div className="car-content__header">
      <div>
        <CloseIcon onClick={() => closeCar()}></CloseIcon>
        <h2>Carrito</h2>
      </div>

      <Button variant="link" onClick={cleanCar}>
        Vaciar
        <CleanCar />
      </Button>
    </div>
  );
}

function CardContentProduct(props) {
  const {
    products: { loading, result },
    idProductsCar,
    idProductCar,
    increaseQuantity,
    decreaseQuantity,
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCar == product.id) {
        const quantity = countDuplicateItemArray(product.id, idProductsCar);
        return (
          <RenderProduct
            key={index}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          ></RenderProduct>
        );
      }
    });
  }
  return null;
}

function RenderProduct(props) {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props;

  return (
    <div className="car-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name}></img>
      <div className="car-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} / Unidad</p>
        </div>
        <div>
          <p>En carrito: {quantity} ud.</p>
          <div>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarContentFooter(props) {
  const { carTotalPrice } = props;
  return (
    <div className="car-content__footer">
      <div>
        <p>Total:</p>
        <p>{carTotalPrice.toFixed(2)}</p>
      </div>
      <Button>Confirmar Pedido</Button>
    </div>
  );
}
