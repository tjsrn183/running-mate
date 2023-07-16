import React from 'react';
import { Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import MyInfoPage from '../components/MyInfoPage';
import ChatPage from '../components/ChatPage';
import RunItemList from '../components/RunItemList';

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
      <p />
      <Link to="/communityPostList">커뮤니티</Link>
      <p />
      <Link to="/registerRun">뜀걸음 등록 페이지</Link>
      <RunItemList />
    </div>
  );
};
export default MainPage;
