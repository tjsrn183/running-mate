import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import { CustomButton } from './common/CustomButton';
import Header from './common/Header';
import { useParams } from 'react-router-dom';
import { useGetUserInfoQuery, useGetRunItemQuery } from '../api/queries';
import { LoadingSpin } from './common/LoadingSpin';
import PedestrianViewMap from './common/Map/PedestrianViewMap';
import ChatPage from './ChatPage';
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

const StartChat = styled(CustomButton)`
    height: 50px;
`;

const ItemDetail = () => {
    const { runItemId } = useParams();

    const runItemIdNum: number = parseInt(runItemId!);
    const runItem = useGetRunItemQuery(runItemIdNum);
    const startTime = runItem.data?.date.split('T').join(' ');
    const dialogRef = useRef<any>();

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
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
                        <StartChat onClick={openModal}>채팅시작하기</StartChat>
                        <dialog ref={dialogRef}>
                            <ChatPage />
                            <button onClick={closeModal}>Close</button>
                        </dialog>
                    </AsideBlock>
                </div>
            )}
        </Container>
    );
};
export default ItemDetail;
