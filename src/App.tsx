import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import CommunityPage from './components/CommunityPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyInfoPage from './components/MyInfoPage';
import NoticeCommunityPage from './components/NoticeCommunityPage';
import RegisterPage from './components/RegisterPage';
import RegisterRunPage from './components/RegisterRunPage';
import RunItemDetailModalPage from './pages/RunItemDetailPage';
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
