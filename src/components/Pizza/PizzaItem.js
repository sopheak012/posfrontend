import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 16px;
`;

const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const PizzaItem = ({ imageSrc, content }) => {
  return (
    <Container>
      <Image src={imageSrc} alt="Pizza" />
      <Content>{content}</Content>
    </Container>
  );
};

export default PizzaItem;
