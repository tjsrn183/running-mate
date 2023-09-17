import React from 'react';
import styled, { keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';
const spinner = keyframes`
  0% {transform: rotate(0deg); }
  100% {transform: rotate(360deg);}
`;

const SpinnerBlock = styled.div`
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: ${palette.orange};
    border-bottom-color: ${palette.orange};
    animation: ${spinner} 0.8s ease infinite;
`;

export const LoadingSpin = () => {
    return <SpinnerBlock></SpinnerBlock>;
};
