import React from 'react';
import { Link } from 'react-router-dom';

import ChatPage from '../components/ChatPage';
import RunItemList from '../components/RunItemList';
import Header from '../components/Header';

const MainPage = () => {
  return (
    <div>
      <Header />
      <div>메인페이지</div>

      <ChatPage />

      <Link to="/login">로그인</Link>
      <p />
      <Link to="/RegisterPage">회원가입</Link>
      <p />
      <Link to="/communityPostList">커뮤니티</Link>
      <p />
      <Link to="/registerRun">뜀걸음 등록 페이지</Link>
      <p />
      <Link to="/myInfo">내 정보로이동</Link>
      <RunItemList />
    </div>
  );
};
export default MainPage;
