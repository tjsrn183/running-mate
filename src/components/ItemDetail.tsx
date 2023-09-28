import React from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import { CustomButton } from './common/CustomButton';
import Header from './common/Header';
import { useParams } from 'react-router-dom';

const Container = styled.div``;

const AsideBlock = styled.aside`
    position: fixed;
    top: 90px;
    right: calc((100% - 900px) / 2);
    width: 300px;
    height: 450px;
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
const WidthSort = styled.div`
    display: flex;
    justify-content: space-around;
`;

const StartChat = styled(CustomButton)`
    height: 50px;
`;

const ItemDetail = () => {
    const { runItemId } = useParams();
    const runItemIdNum: number = parseInt(runItemId!);

    return (
        <Container>
            <Header />
            <Main>
                <BigMap>큰지도 들어갈자리</BigMap>
                <Title>
                    <h1>제목입니다. 러닝하러가요!</h1>
                </Title>
                <UserInfo>
                    <div id="picture" />
                    <div className="nameTime">
                        <div id="name">황선구</div>
                        <div id="time">2023.7.26</div>
                    </div>
                </UserInfo>
                <ClientWriting />
            </Main>

            <AsideBlock>
                <div className="itemInfo">
                    <h4>출발시간</h4>
                    <h3>2023-07-26 오후 17:00</h3>
                </div>
                <WidthSort>
                    <div>
                        <h4>출발지</h4>
                        <h3>죽전동</h3>
                    </div>
                    <div>
                        <h4>도착지</h4>
                        <h3>다사읍</h3>
                    </div>
                </WidthSort>
                <div className="itemInfo">
                    <h4>예상소요시간</h4>
                    <h3>30분</h3>
                </div>
                <div className="itemInfo">
                    <h4>참여인원</h4>
                    <h3>2/3</h3>
                </div>
                <StartChat>채팅시작하기</StartChat>
            </AsideBlock>
        </Container>
    );
};
export default ItemDetail;
