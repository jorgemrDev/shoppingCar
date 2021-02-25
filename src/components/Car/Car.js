import React, { useState } from "react";
import "./Car.scss";
import { Button } from "react-bootstrap";
import { ReactComponent as CarEmpty } from "../../assets/img/cart-empty.svg";

export default function Car(props) {
  const [carOpen, setCarOpen] = useState(false);
  const widthCarContent = carOpen ? 400 : 0;

  const openCar = () => {
    setCarOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCar = () => {
    setCarOpen(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <>
      <Button varian="link" className="car">
        <CarEmpty onClick={openCar} />
      </Button>
      <div className="car-content" style={{ width: widthCarContent }}>
        Productos
      </div>
    </>
  );
}
