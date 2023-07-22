import styled from 'styled-components';
import React from 'react';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background-color: black;
  &:hover {
    background-color: gray;
  }
`;
interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({ children, onClick }: ButtonProps) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default Button;
