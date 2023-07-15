import styled from 'styled-components';
import React from 'react';
const EntireDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;
const StyledInput = styled.input`
  border: gray;
  width: 500px;
`;
const GenderField = styled.div`
  background-color: white;
`;
const GenderInput = styled.input`
  display: inline-block;
`;
const FormField = styled.form`
  background-color: wheat;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 50px 80px;
  border: none;
  text-align: center;
  transform: translate(-50%, -50%);
`;
const RegisterPage2 = () => {
  return (
    <EntireDiv>
      <FormField>
        <StyledInput placeholder="아이디" />
        <p />
        <StyledInput placeholder="비밀번호" />
        <p />
        <StyledInput placeholder="이름" />
        <p />
        <StyledInput placeholder="생년월일" type="date" />
        <p />
        <GenderField>
          <label>
            <p>성별</p>
          </label>
          <label>
            <GenderInput type="radio" name="gender" />
            남자
          </label>

          <label>
            <GenderInput type="radio" name="gender" />
            여자
          </label>
        </GenderField>
        <button type="submit">가입하기</button>
      </FormField>
    </EntireDiv>
  );
};
export default RegisterPage2;
