import React from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import CustomButton from './CustomButton';
const HeaderBlock = styled.header`
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
  padding-left: 10px;
`;

const Space = styled.div`
  height: 4rem;
`;
const Logo = styled.i`
  color: ${palette.orange};
  font-size: 36px;
`;
const LogoLetter = styled.div`
  color: ${palette.orange};
  font-weight: 900;
  font-size: 36px;
  font-family: 'Jua', sans-serif;
  flex-shrink: 0;
`;

const LoginButton = styled(CustomButton)``;
const RegisterButton = styled(CustomButton)`
  color: ${palette.orange};
  background-color: white;
`;

const Category = styled.ul`
  display: flex;
  list-style: none;
  li {
    padding: 8px;
    color: ${palette.orange};
    font-weight: bold;
    font-family: 'Noto Sans KR', sans-serif;
    flex-shrink: 0;
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <LogoLetter>
            <Logo className="material-symbols-rounded">steps</Logo>대구런
          </LogoLetter>
          <Right>
            <Category>
              <li>러닝등록</li>
              <li>커뮤니티</li>
            </Category>
            <LoginButton>로그인</LoginButton>
            <RegisterButton>회원가입</RegisterButton>
          </Right>
        </Wrapper>
      </HeaderBlock>
      <Space />
    </>
  );
};
export default Header;
