import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  grid-row: 1;
  height: 30px;
  min-width: 100%;
  position: fixed;
  top: 0;
  z-index: 99999;
`;

const NavInner = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  margin: auto;
  padding: 0 20px;
  width: 1000px;
  a, button {
    color: ${props => props.theme.links};
    font-family: ${props => props.theme.typeface};
    font-size: 1.6rem;
    font-weight: bold;
  }
  a:hover, button:hover {
    color: ${props => props.theme.linkHover};
    color: #26d4cc;
  }
  a, button, h3 {
    padding: 0 10px;
    text-shadow: 0 0 1px #000,
      0 0 2px #000,
      0 0 3px #000,
      0 0 4px #000,
      0 0 5px #000,
      0 0 6px #000,
      0 0 7px #000,
      0 0 8px #000,
      0 0 9px #000,
      0 0 10px #000;
  }
  h3 {
    color: ${props => props.theme.mainColor};
    align-self: center;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const LinkContainer = styled.div`
  align-self: center;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0;
  outline: transparent;
  padding: 0;
`;

export class Navbar extends PureComponent {
  render() {
    console.log("Navbar Rendering")
    const { authenticated, user, logout } = this.props;
    return (
      <NavContainer>
        <NavInner>
          {authenticated && (
            <React.Fragment>
              <h3>Hello, {user.username}</h3>

              <LinkContainer>
                <Link title="to home page" to="/"><i className="fas fa-home"/></Link>
                <Button title="log out" onClick={logout}><i className="fas fa-sign-out-alt"/></Button>
              </LinkContainer>

            </React.Fragment>
          )}
        </NavInner>
      </NavContainer>
    );
  }
};