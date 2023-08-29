import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
import { useGetUserInfoQuery } from '../../api/queries';
import axios from 'axios';

const HeaderBlock = styled.header`
    position: fixed;
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 1;
    background-color: white;
`;
const Wrapper = styled.div`
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding-left: 10px;
`;

const Logo = styled.i`
    color: ${palette.orange};
    font-size: 36px;
`;
const LogoLetter = styled.div`
    color: ${palette.orange};
    font-weight: 900;
    font-size: 36px;
    font-family: 'Jua', sans-serif;
    flex-shrink: 0;
`;

const LoginButton = styled(CustomButton)`
    margin: 10px;
`;
const RegisterButton = styled(CustomButton)`
    color: ${palette.orange};
    background-color: white;
    &:hover {
        background-color: ${palette.hover_gray};
    }
`;

const Category = styled.ul`
    display: flex;
    list-style: none;
    flex-shrink: 0;
    li {
        padding: 8px;
        color: ${palette.orange};
        font-weight: bold;
        font-family: 'Noto Sans KR', sans-serif;
        &:hover {
            color: ${palette.hover_orange};
        }
    }
`;
const Right = styled.div`
    display: flex;
    align-items: center;
`;
const UserBox = styled.div`
    flex-direction: row-reverse;
    width: 200px;
`;
const Spacer = styled.div`
    height: 4rem;
`;
const LogoutIcon = styled.span`
    color: white;
    background-color: ${palette.orange};
    border-radius: 20%;
    padding: 7px;
    margin-left: 40px;
`;
const UserName = styled.span`
    color: ${palette.user_name};
    text-align: center;
    font-weight: bold;
    padding-bottom: 3px;
    border-bottom: 2px solid ${palette.orange};
    font-size: 19px;
    padding: 0 10px;
`;
const Header = () => {
    const userInfo = useGetUserInfoQuery();
    if (userInfo) {
        console.log(userInfo.data.user);
    }
    const kakaoLogoutfunc = async () => {
        const logout = await axios.get('http://localhost:8080/auth/kakao/logout');
        console.log(logout);
    };
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <LogoLetter>
                        <Link to="/">
                            <Logo className="material-symbols-rounded">steps</Logo>
                            대구런
                        </Link>
                    </LogoLetter>
                    <Right>
                        <Category>
                            <li>
                                <Link to="/registerRun">러닝등록</Link>
                            </li>
                            <li>
                                <Link to="/communityPostList">커뮤니티</Link>
                            </li>
                        </Category>

                        {userInfo.data?.user ? (
                            <UserBox>
                                <Link to="/myInfo">
                                    <UserName>{userInfo.data.user.nick}님!</UserName>
                                </Link>
                                <LogoutIcon className="material-symbols-outlined" onClick={kakaoLogoutfunc}>
                                    logout
                                </LogoutIcon>
                            </UserBox>
                        ) : (
                            <UserBox>
                                <LoginButton>
                                    <Link to="/login">로그인</Link>
                                </LoginButton>
                                <RegisterButton>
                                    <Link to="/RegisterPage">회원가입</Link>
                                </RegisterButton>
                            </UserBox>
                        )}
                    </Right>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};
export default Header;
