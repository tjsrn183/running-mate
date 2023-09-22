import styled from 'styled-components';
import React, { CSSProperties } from 'react';
import palette from '../../lib/styles/palette';

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
const StyledButton2 = styled(StyledButton)`
    background-color: white;
    color: ${palette.orange};
    &:hover {
        background-color: ${palette.hover_orange};
        color: white;
    }
`;
interface ButtonProps {
    onClick?: any;
    children?: React.ReactNode;
    style?: CSSProperties | undefined;
}

const CustomButton = ({ children, onClick, style, ...rest }: ButtonProps) => (
    <StyledButton onClick={onClick} style={style} {...rest}>
        {children}
    </StyledButton>
);
const CustomButton2 = ({ children, onClick, style, ...rest }: ButtonProps) => (
    <StyledButton2 onClick={onClick} style={style} {...rest}>
        {children}
    </StyledButton2>
);
export { CustomButton, CustomButton2 };
