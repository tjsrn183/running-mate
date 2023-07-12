import React from 'react';
import { Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import styled from 'styled-components';
import MyInfoPage from './MyInfoPage';
import ChatPage from './ChatPage';

const MainPage = () => {
  return (
    <div>
      <div>메인페이지</div>
      <RegisterPage />
      <MyInfoPage />
      <ChatPage />
    </div>
  );
};
export default MainPage;
