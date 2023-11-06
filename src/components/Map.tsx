import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CustomButton } from './common/CustomButton';
import palette from '../lib/styles/palette';
import Editor from './write/Editor';
import MapComponent from './common/Map/MapComponent';
import { useDispatch } from 'react-redux';
import { startEndLocation, subInfoType } from '../redux/runSlice';
import { useAppSelector } from '../redux/hooks';
import routesPedestrian from './common/Map/routesPedestrian';
import { runActionType, runNaturalLanType, locationNaturalLan, subInfo, initialize } from '../redux/runSlice';
import searchPois from './common/Map/searchPois';
import { useCreateRoomMutation, useRunRegisterItemMutation } from '../api/queries';
import { useGetUserInfoQuery } from '../api/queries';
import { useNavigate } from 'react-router-dom';
import { LoadingSpin } from './common/LoadingSpin';
const StyledMapBlock = styled.div`
    position: relative;
    top: 100px;
    width: 100%;
    height: 700px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(7, 1fr);
`;
const MapBlock = styled.div`
    background-color: black;
    grid-column: 2/5;
    grid-row: 1/7;
`;
const EditorBlock = styled.div`
    grid-column: 5/8;
    grid-row: 1/7;
`;

const CourseBlock = styled.div`
    border-radius: 4px;
    margin-left: 10px;
    grid-column: 8/10;
    grid-row: 1/6;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
`;
const Course = styled.div`
    grid-row: 1/2;
    padding: 0px 16px 0px 9px;
    & .material-symbols-outlined {
        position: absolute;
    }
`;
const StartBlock = styled.div`
    margin: 0 0 0 10px;
`;
const StartDateTime = styled.input`
    border-radius: 4px;
    height: 30px;

    grid-row: 2/3;
`;
const CourseInput = styled.input`
    width: 100%;
    height: 30px;
    padding-left: 30px;
`;
const AttendNumber = styled.input`
    width: 100%;
    height: 30px;
`;
const DistanceItem = styled(CustomButton)`
    color: ${palette.orange};
    background-color: ${palette.back_ground_orange};
    padding: 10px 100px;
    margin: 10px 10px 3px 10px;
    grid-row: 3/4;
    &:hover {
        background-color: ${palette.hover_gray};
    }
`;
const ResearchIcon = styled.span`
    padding: 6px 3px;
    cursor: pointer;
`;
const RunInfo = styled.div`
    margin: 20px 10px;
    color: gray;
    background-color: ${palette.back_ground_orange};
    padding: 20px;
    border-radius: 10px;
    grid-row: 4/5;
    h3 {
        color: black;
    }
`;
const InputBlock = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
`;
const RegisterItem = styled(CustomButton)`
    border-radius: 20px;
    margin: 1px 10px;
    padding: 10px 100px;
    grid-row: 5/6;
`;
const SubRunInfo = styled.div`
    font-weight: bold;
    color: black;
    font-size: xx-large;
`;
const Map = () => {
    const dispatch = useDispatch();
    const createRoom = useCreateRoomMutation();
    const runRegister = useRunRegisterItemMutation();
    const navigate = useNavigate();
    const [people, setPeople] = useState(2);
    const dateNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const [startDateTime, setStartDateTime] = useState(dateNow);
    const userInfo = useGetUserInfoQuery();
    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, []);
    const {
        start,
        end,
        CURRENT_MAP,
        startLocationNaturalLan,
        endLocationNaturalLan,
        distance,
        durationTime,
        title,
        body,
        date
    } = useAppSelector(({ run }) => ({
        start: run.start,
        end: run.end,
        CURRENT_MAP: run.currentMapState,
        startLocationNaturalLan: run.startLocationNaturalLan,
        endLocationNaturalLan: run.endLocationNaturalLan,
        distance: run.distance,
        durationTime: run.durationTime,
        title: run.title,
        body: run.body,
        date: run.date
    }));
    const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const RegisterNumber = Number(e.target.value);
        console.log('RegisterNumber임', RegisterNumber);
        setPeople(RegisterNumber);
    };
    const calDistance = () => {
        routesPedestrian(start, end, CURRENT_MAP.currentMapState, dispatch);
    };
    const changeLatLon = (payload: runActionType) => dispatch(startEndLocation(payload));
    const locationNutural = (payload: runNaturalLanType) => dispatch(locationNaturalLan(payload));
    const searchAddress = (searchLocation: string) => {
        searchPois(CURRENT_MAP.currentMapState, searchLocation);
    };
    const onChangeLetter = (payload: subInfoType) => dispatch(subInfo(payload));
    const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(subInfo({ key: 'date', value: e.target.value }));
        setStartDateTime(e.target.value);
    };
    const clickRegister = async () => {
        if (startLocationNaturalLan && endLocationNaturalLan) {
            const runRegisterFunc = await runRegister[0]({
                name: userInfo.data?.user.user.nick,
                start,
                end,
                startLocationNaturalLan,
                endLocationNaturalLan,
                durationTime,
                distance,
                date,
                title,
                body,
                numberOfPeople: people
            }).unwrap();
            console.log('runRegisterFunc.runItemId 반환값임', runRegisterFunc.runItemId);
            console.log('runRegisterFunc.runItemId 의 타입임', typeof runRegisterFunc.runItemId);
            const createRoomfunc = await createRoom[0]({
                title,
                max: people,
                name: userInfo.data?.user.user.nick as unknown as string,
                runItemId: runRegisterFunc.runItemId
            });
            if (runRegister[1].isLoading || createRoom[1].isLoading) {
                return <LoadingSpin />;
            }
            navigate(`/runItemDetail/${runRegisterFunc.runItemId}`);
        }
    };
    return (
        <StyledMapBlock>
            <MapBlock>
                <MapComponent changeLatLon={changeLatLon} locationNutural={locationNutural} />
            </MapBlock>
            <EditorBlock>
                <Editor height="480px" onChangeField={onChangeLetter} title={title} body={body} />
            </EditorBlock>
            <CourseBlock>
                <Course>
                    <InputBlock>
                        <CourseInput
                            placeholder="출발지를 입력하세요"
                            value={startLocationNaturalLan}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(locationNaturalLan({ key: 'startLocationNaturalLan', value: e.target.value }));
                            }}
                        />
                        <ResearchIcon
                            className="material-symbols-outlined"
                            onClick={() => searchAddress(startLocationNaturalLan)}
                        >
                            search
                        </ResearchIcon>
                    </InputBlock>
                    <br />
                    <InputBlock>
                        <CourseInput
                            placeholder="도착지를 입력하세요"
                            value={endLocationNaturalLan}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(locationNaturalLan({ key: 'endLocationNaturalLan', value: e.target.value }));
                            }}
                        />
                        <ResearchIcon
                            className="material-symbols-outlined"
                            onClick={() => searchAddress(endLocationNaturalLan)}
                        >
                            search
                        </ResearchIcon>
                    </InputBlock>
                    <br />
                    <p>참여인원</p>
                    <AttendNumber type="number" min="0" max="20" value={people} onChange={onChangeRegister} />
                </Course>
                <StartBlock>
                    <p>출발시간</p>
                    <StartDateTime type="datetime-local" value={startDateTime} onChange={onChangeDate} />
                </StartBlock>
                <DistanceItem onClick={calDistance}>거리보기</DistanceItem>
                <br />
                <RunInfo>
                    <div>
                        거리 <SubRunInfo>{distance}km</SubRunInfo>
                    </div>
                    <div>
                        예상소요시간 <SubRunInfo>{durationTime}분</SubRunInfo>
                    </div>
                </RunInfo>
                <RegisterItem onClick={clickRegister}>등록하기</RegisterItem>
            </CourseBlock>
        </StyledMapBlock>
    );
};
export default Map;
