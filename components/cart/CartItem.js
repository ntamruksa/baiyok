import React from "react";
import formatMoney from "../../services/formatMoney";
import styled from "styled-components";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => (
  <CartItemStyles>
    <img width="80" src={cartItem.item.image} alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>
        {formatMoney(cartItem.totalPrice * cartItem.quantity)}
        {" - "}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.totalPrice)}
        </em>
      </p>
    </div>
  </CartItemStyles>
);

export default CartItem;
