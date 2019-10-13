import React from "react";
import styled from "styled-components";

const Container = styled.form`
   background: rgba(38, 212, 204, 0.267);
   border: 1px solid rgb(38, 212, 204);
   border-radius: 10px;
   box-shadow: 0 0 1px #000,
      0 0 2px #000,
      0 0 4px #000,
      0 0 8px #111,
      0 0 10px #111,
      0 0 20px #222,
      0 0 40px #aaa,
      inset 0 0 100px 30px rgb(0,0,0);
   color: #fff;
   padding: 30px;
   text-align: center;
   width: 300px;
   h2 {
      font-size: 2.2rem;
      font-weight: bold;
      text-align: center;
   }
   label {
      text-align: left;
   }
   p {
      font-size: 1.4rem;
      padding-top: 10px;
      text-align: center;
   }
`;

export const Form = props => (
   <Container {...props}>
      {props.children}
   </Container>
)
