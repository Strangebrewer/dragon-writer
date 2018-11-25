import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  grid-row: 1;
  grid-column: 1 / 4;
  min-width: 100%;
  height: 30px;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.bg};
  z-index: 99999;
`;

const NavInner = styled.div`
  width: 1000px;
  margin: auto;
  height: 30px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  a, button {
    font-size: 1.6rem;
    font-weight: bold;
    font-family: ${props => props.theme.text};
    color: ${props => props.theme.link};
  }
  a:hover, button:hover {
    color: ${props => props.theme.linkHover};
  }
  a, button, h3 {
     padding: 0 10px;
  }
  a {
     border-right: 1px solid ${props => props.theme.color};
  }
  h3 {
    font-size: 1.8rem;
    font-weight: bold;
    color: ${props => props.theme.primary};
    align-self: center;
  }
`;

const LinkContainer = styled.div`
  align-self: center;
`;

const Button = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

const Nav = props => {
  const { authenticated, user, logout } = props;
  return (
    <NavContainer>
      <NavInner>
        {authenticated && (
          <React.Fragment>
            <h3>Hello, {user.username}!</h3>

            <LinkContainer>
              <Link to="/">Home</Link>
              <Button onClick={logout}>Logout</Button>
            </LinkContainer>

          </React.Fragment>
        )}
      </NavInner>
    </NavContainer>
  );
};

export default Nav;