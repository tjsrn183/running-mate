import styled from 'styled-components';
import React, { useEffect } from 'react';
import Header from '../components/common/Header';
import CustomButton from '../components/common/CustomButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  changeAuthField,
  initializeForm,
  AuthFormKey
} from '../redux/authSlice';

const EntireDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(./login_background.jpg) no-repeat center;
`;
const FormField = styled.form`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  border: none;
  transform: translate(-50%, -50%);
  padding: 0 50px 20px 40px;
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
  border-radius: 4px;
  font-size: medium;
`;
const SubmitButton = styled(CustomButton)`
  width: 100%;
  height: 50px;
`;
const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(({ auth }) => ({
    form: auth.register
  }));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeAuthField({
        form: 'register',
        key: name as AuthFormKey,
        value
      })
    );
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);
  return (
    <EntireDiv>
      <Header />
      <FormField onSubmit={onSubmit}>
        <h1>회원가입</h1>
        <label>
          아이디
          <br />
          <StyledInput
            placeholder="아이디"
            name="id"
            onChange={onChange}
            value={form.id}
          />
        </label>

        <p />
        <label>
          비밀번호
          <br />
          <StyledInput
            placeholder="비밀번호"
            type="password"
            name="password"
            onChange={onChange}
            value={form.password}
          />
        </label>
        <p />
        <label>
          이름
          <br />
          <StyledInput
            placeholder="이름"
            type="text"
            name="name"
            onChange={onChange}
            value={form.name}
          />
        </label>
        <p />
        <label>
          전화번호
          <br />
          <StyledInput
            type="tel"
            placeholder="전화번호"
            name="phoneNumber"
            onChange={onChange}
            value={form.phoneNumber}
          />
        </label>
        <p />
        <label>
          닉네임
          <br />
          <StyledInput
            placeholder="닉네임"
            type="text"
            name="nickname"
            onChange={onChange}
            value={form.nickname}
          />
        </label>
        <p />
        <label>
          생년월일
          <br />
          <StyledInput
            placeholder="생년월일"
            type="date"
            name="birthday"
            onChange={onChange}
            value={form.birthday}
          />
        </label>
        <p />

        <label>
          <p>성별</p>
        </label>
        <label>
          <input
            type="radio"
            name="sex"
            onChange={onChange}
            value="male"
            checked={form.sex === 'male'}
          />
          남자
        </label>

        <label>
          <input
            type="radio"
            name="sex"
            onChange={onChange}
            value="female"
            checked={form.sex === 'female'}
          />
          여자
        </label>
        <p />
        <SubmitButton>가입하기</SubmitButton>
      </FormField>
    </EntireDiv>
  );
};
export default RegisterPage;
