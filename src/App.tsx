import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import CommunityWritePage from './pages/CommunityPage/WritePage';
import CommunityPostListPage from './pages/CommunityPage/PostListPage';
import CommunityPostPage from './pages/CommunityPage/PostPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyInfoPage from './pages/MyInfoPage';
import ItemPage from './pages/ItemPage';
import RunItemDetailModalPage from './components/ItemDetail';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import RegisterRunPage from './pages/RegisterRunPage';
import { Helmet } from 'react-helmet-async';

const App = () => {
    return (
        <>
            <Helmet>
                <title>대구런</title>
            </Helmet>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/communityWrite" element={<CommunityWritePage />} />
                <Route path="/communityPostPage" element={<CommunityPostPage />} />
                <Route path="/communityPostList" element={<CommunityPostListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/myInfo" element={<MyInfoPage />} />
                <Route path="/ItemPage" element={<ItemPage />} />
                <Route path="/runItemDetail" element={<RunItemDetailModalPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/RegisterRun" element={<RegisterRunPage />} />
            </Routes>
        </>
    );
};

export default App;
