import React from 'react';
import { Link } from 'react-router-dom';

import ChatPage from '../components/ChatPage';
import RunItemList from '../components/RunItemList';
import Header from '../components/common/Header';
import MainTop from '../components/MainTop';

const MainPage = () => {
    return (
        <div>
            <Header />
            <MainTop />
            <ChatPage />
            <p />

            <RunItemList />
        </div>
    );
};
export default MainPage;
