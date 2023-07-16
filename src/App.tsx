import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import CommunityWritePage from './pages/CommunityPage/WritePage';
import CommunityPostListPage from './pages/CommunityPage/PostListPage';
import CommunityPostPage from './pages/CommunityPage/PostPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyInfoPage from './components/MyInfoPage';
import RegisterPage from './pages/RegisterPage';
import RegisterRunPage from './pages/RegisterRunPage';
import RunItemDetailModalPage from './pages/RunItemDetailPage';
import RegisterPage2 from './pages/RegisterPage2';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/communityWrite" element={<CommunityWritePage />} />
      <Route path="/communityPostPage" element={<CommunityPostPage />} />
      <Route path="/communityPostList" element={<CommunityPostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/myInfo" element={<MyInfoPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registerRun" element={<RegisterRunPage />} />
      <Route path="/runItemDetail" element={<RunItemDetailModalPage />} />
      <Route path="/RegisterPage2" element={<RegisterPage2 />} />
    </Routes>
  );
};

export default App;
