import styled from 'styled-components';
import React from 'react';
import Header from '../components/common/Header';
import CustomButton from '../components/common/CustomButton';
import palette from '../lib/styles/palette';
const EntireDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./login_background.jpg) no-repeat center;
`;
const FormField = styled.form`
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  border: none;
  transform: translate(-50%, -50%);

  color: white;
  h1 {
    text-align: center;
    font-size: 50px;
  }
  label {
    font-weight: bold;
    font-size: large;
  }
`;
const StyledInput = styled.input`
  outline-color: rgba(255, 255, 255, 0);
  border: rgba(255, 255, 255, 0);
  width: 400px;
  height: 45px;
  opacity: 0.5;
  border-radius: 4px;
`;
const SubmitButton = styled(CustomButton)`
  width: 100%;
  height: 50px;
`;
const RegisterPage = () => {
  return (
    <EntireDiv>
      <Header />
      <FormField>
        <h1>회원가입</h1>
        <label>
          아이디
          <br />
          <StyledInput placeholder="아이디" />
        </label>

        <p />
        <label>
          비밀번호
          <br />
          <StyledInput placeholder="비밀번호" />
        </label>
        <p />
        <label>
          이름
          <br />
          <StyledInput placeholder="이름" />
        </label>
        <p />
        <label>
          닉네임
          <br />
          <StyledInput placeholder="닉네임" />
        </label>
        <p />
        <label>
          생년월일
          <br />
          <StyledInput placeholder="생년월일" type="date" />
        </label>
        <p />

        <label>
          <p>성별</p>
        </label>
        <label>
          <input type="radio" name="gender" />
          남자
        </label>

        <label>
          <input type="radio" name="gender" />
          여자
        </label>
        <p />
        <SubmitButton>가입하기</SubmitButton>
      </FormField>
    </EntireDiv>
  );
};
export default RegisterPage;
