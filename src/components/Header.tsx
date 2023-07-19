import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';
const HeaderBlock = styled.header`
  background-color: ${palette.sky};
`;
const Logo = styled.img`
  width: 70px;
  height: 70px;
  margin-left: 30px;
`;
const Nav = styled.nav``;

const Header = () => {
  return (
    <HeaderBlock>
      <Logo src="/Daegu Run - MarkMaker Logo.png" />

      <Nav></Nav>
    </HeaderBlock>
  );
};
export default Header;
