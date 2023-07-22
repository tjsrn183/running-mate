import styled from 'styled-components';
import React from 'react';
import palette from '../lib/styles/palette';

const StyledButton = styled.button`
  border: ${palette.orange};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  flex-shrink: 0;
  background-color: ${palette.orange};
  &:hover {
    background-color: ${palette.hover_orange};
  }
`;
interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const CustomButton = ({ children, onClick }: ButtonProps) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default CustomButton;
