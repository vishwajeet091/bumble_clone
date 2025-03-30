// src/components/NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaComments, FaUser } from 'react-icons/fa';

const NavBar = () => {
  return (
    <NavContainer>
      <Logo>Bumble Clone</Logo>
      <NavLinks>
        <StyledNavLink to="/">
          <FaUser />
          <span>Profiles</span>
        </StyledNavLink>
        <StyledNavLink to="/chat">
          <FaComments />
          <span>Chats</span>
        </StyledNavLink>
      </NavLinks>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--bumble-yellow);
  color: var(--bumble-black);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--bumble-black);
  padding: 5px 10px;
  border-radius: 8px;
  transition: background-color 0.3s;

  &.active {
    background-color: rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }

  svg {
    margin-bottom: 4px;
    font-size: 1.2rem;
  }
`;

export default NavBar;