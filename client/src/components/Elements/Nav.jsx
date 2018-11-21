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
  background-color: white;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  z-index: 99999;
`;

const NavInner = styled.div`
  width: 1000px;
  margin: auto;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  a, button {
    font-size: 1.3rem;
    color: ${props => props.theme.black};
  }
  a, button, h3 {
     padding: 0 10px;
  }
  a, button {
     border-right: 1px solid lightgrey;
  }
  button:last-of-type { border: none }
  h3 {
    font-weight: bold;
    color: ${props => props.theme.primary }
  }
`;

const Button = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

class Nav extends React.PureComponent {
  render() {
    const { authenticated, user, logout } = this.props;
    return (
      <NavContainer>
        <NavInner>
          {authenticated && (
            <React.Fragment>
              <h3>Hello {user.username}!</h3>
              <Link to="/">Home</Link>
              <Button onClick={logout}>Logout</Button>
            </React.Fragment>
          )}
        </NavInner>
      </NavContainer>
    );
  }
};

export default Nav;