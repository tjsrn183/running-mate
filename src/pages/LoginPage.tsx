import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
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
`;
const StyledInput = styled.input`
  width: 300px;
  height: 40px;
`;
const StyledButton = styled.button`
  width: 300px;
  height: 50px;
`;
const StyledNoBorderButton = styled.button`
  border: none;
  background-color: white;
`;
const Login = () => {
  return (
    <div>
      <StyledBackground>
        <SyledLoginDiv>
          <h1>Login</h1>
          <StyledInput type="text" id="user_id" placeholder="아이디" />
          <p />
          <StyledInput
            type="password"
            id="user_password"
            placeholder="비밀번호"
          />
          <p />
          <StyledButton>
            <p>로그인</p>
          </StyledButton>
          <br />
          <StyledNoBorderButton>
            <p>회원가입</p>
          </StyledNoBorderButton>
        </SyledLoginDiv>
      </StyledBackground>
    </div>
  );
};
export default Login;
