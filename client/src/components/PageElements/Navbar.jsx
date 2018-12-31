import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  background-color: ${props => props.theme.pageBG};
  grid-column: 1 / 4;
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
  }
  a, button, h3 {
     padding: 0 10px;
  }
  a {
     border-right: 1px solid ${props => props.theme.mainColor};
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

const ModeButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.links};
  cursor: pointer;
  font-family: ${props => props.theme.typeface};
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0;
  outline: transparent;
  padding: 0 20px 0 0;
  position: absolute;
  top: 7px;
  right: 0;
  &:hover {
    color: ${props => props.theme.linkHover};
  }
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
    const { authenticated, user, logout, nextMode, toggleStyleMode } = this.props;
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

        <ModeButton onClick={() => toggleStyleMode(nextMode)}>Toggle {nextMode} Mode</ModeButton>
      </NavContainer>
    );
  }
};