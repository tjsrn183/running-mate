import React from 'react';
import { Link } from 'react-router-dom';
import RegisterPage from '../components/RegisterPage';
import styled from 'styled-components';
import MyInfoPage from '../components/MyInfoPage';
import ChatPage from '../components/ChatPage';
import login from './LoginPage';

const MainPage = () => {
  return (
    <div>
      <div>메인페이지</div>
      <RegisterPage />
      <MyInfoPage />
      <ChatPage />
      <Link to="/login">로그인</Link>
    </div>
  );
};
export default MainPage;
