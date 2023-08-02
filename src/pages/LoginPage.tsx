import React, { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import CustomButton from '../components/common/CustomButton';
import palette from '../lib/styles/palette';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeField, initializeForm, AuthFormKey } from '../redux/authSlice';

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
const SyledLoginForm = styled.form`
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
const Footer = styled.div`
  text-align: right;
  color: ${palette.orange};
  text-decoration: underline;
  &:hover {
    color: ${palette.hover_orange};
  }
`;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector(({ auth }) => ({
    form: auth.login
  }));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name as AuthFormKey,
        value
      })
    );
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);
  return (
    <div>
      <StyledBackground>
        <Header />
        <SyledLoginForm onSubmit={onSubmit}>
          <h1>로그인</h1>
          <StyledInput
            type="text"
            id="user_id"
            placeholder="아이디"
            name="id"
            onChange={onChange}
            value={form.id}
          />
          <p />
          <StyledInput
            type="password"
            id="user_password"
            placeholder="비밀번호"
            name="password"
            onChange={onChange}
            value={form.password}
          />
          <p />
          <StyledButton>로그인</StyledButton>
          <p />
          <StyledNoBorderButton>
            <img
              src={'/kakao_login_medium.png'}
              className="kakaoLogin"
              alt="카카오로그인"
            />
          </StyledNoBorderButton>
          <br />
          <Footer>
            <Link to="/RegisterPage">회원가입</Link>
          </Footer>
        </SyledLoginForm>
      </StyledBackground>
    </div>
  );
};
export default LoginPage;
