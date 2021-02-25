import React from "react";
import "./Products.scss";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";
import Product from "../Product";

export default function Products(props) {
  const {
    products: { result, loading, error },
  } = props;

  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((item, index) => (
            <Product key={index} product={item}></Product>
          ))
        )}
      </Row>
    </Container>
  );
}
