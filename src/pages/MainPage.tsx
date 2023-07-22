import React from 'react';
import { Link } from 'react-router-dom';

import ChatPage from '../components/ChatPage';
import RunItemList from '../components/RunItemList';
import Header from '../components/common/Header';

const MainPage = () => {
  return (
    <div>
      <Header />

      <ChatPage />

      <p />
      <Link to="/myInfo">내 정보로이동</Link>
      <RunItemList />
    </div>
  );
};
export default MainPage;
