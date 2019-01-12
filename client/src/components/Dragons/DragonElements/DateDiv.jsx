import React from "react";
import dateFns from "date-fns";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const DateText = styled.h5`
    display: inline-block;
    font-size: 1rem;
    margin-top: 8px;
`;

export const DateDiv = ({text}) => (
  <Container>
    <DateText>
      created: {dateFns.format(text.createdAt, "MMM DD, YYYY")}
    </DateText>

    <DateText>
      modified: {dateFns.format(text.updatedAt, "MMM DD, YYYY")}
    </DateText>
  </Container>
);