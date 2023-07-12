import React from 'react';
import { Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <div>
      <div>메인페이지</div>
      <RegisterPage />
    </div>
  );
};
export default MainPage;
