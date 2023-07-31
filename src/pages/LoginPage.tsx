import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

import CustomButton from '../components/common/CustomButton';

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./login_background.jpg) no-repeat center;
  h1 {
    color: white;
  }
`;
const SyledLoginDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 50px 80px;
  background-color: white;
  border: none;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
`;
const StyledInput = styled.input`
  width: 300px;
  height: 40px;
`;
const StyledButton = styled(CustomButton)`
  width: 100%;
  height: 50px;
`;
const StyledNoBorderButton = styled.button`
  border: none;

  padding: 0;
  border-radius: 12px;

  background-color: white;
  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const LoginPage = () => {
  return (
    <div>
      <StyledBackground>
        <Header />
        <SyledLoginDiv>
          <h1>로그인</h1>
          <StyledInput type="text" id="user_id" placeholder="아이디" />
          <p />
          <StyledInput
            type="password"
            id="user_password"
            placeholder="비밀번호"
          />
          <p />
          <StyledButton>로그인</StyledButton>
          <br />
          <Link to="/RegisterPage">회원가입</Link>
          <p />
          <StyledNoBorderButton>
            <img
              src={'/kakao_login_medium.png'}
              className="kakaoLogin"
              alt="카카오로그인"
            />
          </StyledNoBorderButton>
        </SyledLoginDiv>
      </StyledBackground>
    </div>
  );
};
export default LoginPage;
