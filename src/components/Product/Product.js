import React from "react";
import "./Product.scss";
import { Col, Card, Button } from "react-bootstrap";
import Loading from "../Loading";
import { BASE_PATH } from "../../utils/constants";

export default function Product(props) {
  const { product, addProductToCart } = props;

  return (
    <Col xs={3} className="product">
      <Card>
        <Card.Img
          variant="top"
          src={`${BASE_PATH}/${product.image}`}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price}00 $/ Unidad</Card.Text>
          <Button onClick={() => addProductToCart(product.id, product.name)}>
            Añadir al Carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
