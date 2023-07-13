import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyInfoPage from './pages/MyInfoPage';
import NoticeCommunityPage from './pages/NoticeCommunityPage';
import RegisterPage from './pages/RegisterPage';
import RegisterRunPage from './pages/RegisterRunPage';
import RunItemDetailModalPage from './pages/RunItemDetailModalPage';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/myInfo" element={<MyInfoPage />} />
      <Route path="/noticeCommunity" element={<NoticeCommunityPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registerRun" element={<RegisterRunPage />} />
      <Route path="/runItemDetail" element={<RunItemDetailModalPage />} />
    </Routes>
  );
};

export default App;
