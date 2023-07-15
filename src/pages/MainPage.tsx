import React from 'react';
import { Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import MyInfoPage from '../components/MyInfoPage';
import ChatPage from '../components/ChatPage';

const MainPage = () => {
  return (
    <div>
      <div>메인페이지</div>
      <RegisterPage />
      <MyInfoPage />
      <ChatPage />

      <Link to="/login">로그인</Link>
      <p />
      <Link to="/RegisterPage2">회원가입</Link>
    </div>
  );
};
export default MainPage;
