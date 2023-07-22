import React from 'react';
import styled from 'styled-components';
import palette from '../styles/palette';

import button from './Button';
const HeaderBlock = styled.header`
  background-color: ${palette.sky};
  position: fixed;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
const Wrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;

const Space = styled.div`
  height: 4rem;
`;
const Logo = styled.img`
  width: 100px;
  height: 65px;
`;
const LoginButton = styled(button)``;
const Category = styled.div``;
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Logo src="/Daegu Run - MarkMaker Logo.png" />
          <Right>
            <Category>커뮤니티</Category>
            <LoginButton>로그인</LoginButton>
          </Right>
        </Wrapper>
      </HeaderBlock>
      <Space />
    </>
  );
};
export default Header;
