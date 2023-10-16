import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import { CustomButton } from './common/CustomButton';
import Header from './common/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserInfoQuery, useGetRunItemQuery, useDeleteRunItemMutation } from '../api/queries';
import { LoadingSpin } from './common/LoadingSpin';
import PedestrianViewMap from './common/Map/PedestrianViewMap';
import ChatPage from './ChatPage';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../redux/hooks';
import { userInfo } from 'os';

const Container = styled.div``;

const AsideBlock = styled.aside`
    position: fixed;
    top: 90px;
    right: calc((100% - 900px) / 2);
    width: 300px;
    height: 660px;
    background-color: ${palette.back_ground_orange};
    display: flex;
    flex-direction: column;

    h4 {
        color: ${palette.orange};
    }
    .itemInfo {
        padding-left: 20px;
    }
`;
const ClientWriting = styled.div`
    width: 100%;
    height: 500px;
    background-color: yellow;
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 650px;
    margin: 0 auto;
    padding-top: 30px;
    transform: translate(-200px);
`;
const BigMap = styled.div`
    background-color: yellow;
    width: 100%;
    height: 50vh;
`;
const Title = styled.div`
    font-weight: bolder;
    font-size: x-large;
`;
const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    #picture {
        margin-right: 10px;
        width: 50px;
        height: 50px;

        background-color: yellow;
        border-radius: 50%;
    }
    .nameTime {
        flex-direction: column;
    }
`;
const StartEndLocation = styled.div``;
const DeleteSpan = styled.i`
    display: flex;
    cursor: pointer;
    justify-content: center;
    font-size: 45px;
`;

const WrapLinkComponent = ({ children, to }: any) => (
    <CustomButton style={{ height: '50px' }}>
        <Link to={to}>{children}</Link>
    </CustomButton>
);

const ItemDetail = () => {
    const { runItemId } = useParams();
    const navigate = useNavigate();
    const userInfo = useGetUserInfoQuery();
    const runItemIdNum: number = parseInt(runItemId!);
    const runItem = useGetRunItemQuery(runItemIdNum);
    const deleteRunItem = useDeleteRunItemMutation();
    console.log('runItem.data.roomId임', runItem.data?.roomId);
    console.log('runItem임', runItem);
    const startTime = runItem.data?.date.split('T').join(' ');
    console.log('룸아이디다~~~~~~~~~', runItem.data?.ChatRoom?.roomId);
    const ownPost = userInfo.data?.user?.user?.id === runItem.data?.UserId;
    const deleteRunItemFunc = async () => {
        await deleteRunItem[0](runItemIdNum);
        if (deleteRunItem[1].isLoading) {
            <LoadingSpin />;
        }
        navigate('/');
    };

    return (
        <Container>
            <Header />
            {!runItem.data ? (
                <LoadingSpin />
            ) : (
                <div>
                    <Main>
                        <BigMap>
                            <PedestrianViewMap start={runItem.data.start} end={runItem.data.end}></PedestrianViewMap>
                        </BigMap>
                        <Title>
                            <h1>{runItem.data.title}</h1>
                        </Title>
                        <UserInfo>
                            <div id="picture" />
                            <div className="nameTime">
                                <div id="name">{runItem.data.name}</div>
                                <div id="time">{runItem.data.createdAt?.slice(0, 10)}</div>
                            </div>
                        </UserInfo>
                        <ClientWriting dangerouslySetInnerHTML={{ __html: runItem.data.body }} />
                    </Main>
                    <AsideBlock>
                        <div className="itemInfo">
                            <h4>출발시간</h4>
                            <h3>{startTime}</h3>
                        </div>
                        <StartEndLocation>
                            <div className="itemInfo">
                                <h4>출발지</h4>
                                <h3>{runItem.data.startLocationNaturalLan}</h3>
                            </div>
                            <div className="itemInfo">
                                <h4>도착지</h4>
                                <h3>{runItem.data.endLocationNaturalLan}</h3>
                            </div>
                        </StartEndLocation>
                        <div className="itemInfo">
                            <h4>예상소요시간</h4>
                            <h3>{runItem.data.durationTime}분</h3>
                        </div>
                        <div className="itemInfo">
                            <h4>거리</h4>
                            <h3>{runItem.data.distance}km</h3>
                        </div>
                        <div className="itemInfo">
                            <h4>참여인원</h4>
                            <h3>{runItem.data.numberOfPeople}</h3>
                        </div>
                        {runItem.data.ChatRoom?.roomId ? (
                            <WrapLinkComponent to={`/ChatPage/${runItem.data.ChatRoom.roomId}`}>
                                채팅시작하기
                            </WrapLinkComponent>
                        ) : (
                            <div></div>
                        )}
                        {ownPost && (
                            <DeleteSpan onClick={deleteRunItemFunc} className="material-symbols-outlined">
                                delete
                            </DeleteSpan>
                        )}
                    </AsideBlock>
                </div>
            )}
        </Container>
    );
};
export default ItemDetail;
