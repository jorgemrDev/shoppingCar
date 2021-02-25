import React, { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { urlApiProducts, STORAGE_PRODUCTS_CAR } from "./utils/constants";
import Products from "./components/Products";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const products = useFetch(urlApiProducts, null);
  const [productCar, setProductCar] = useState([]);

  useEffect(() => {
    getProductsCar();
  }, []);

  const getProductsCar = () => {
    const idProducts = localStorage.getItem(STORAGE_PRODUCTS_CAR);
    if (idProducts) {
      const idProductsSplit = idProducts.split(",");
      setProductCar(idProductsSplit);
    } else {
      setProductCar([]);
    }
  };

  const addProductToCart = (id, name) => {
    const idProductsCar = productCar;
    idProductsCar.push(id);
    setProductCar(idProductsCar);
    localStorage.setItem(STORAGE_PRODUCTS_CAR, productCar);
    toast.success(`${name} añadido al carrito correctamente.`);
  };

  return (
    <div className="App">
      <TopMenu></TopMenu>
      <Products products={products} addProductToCart={addProductToCart} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

export default App;
