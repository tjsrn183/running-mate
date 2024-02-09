import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//
import Editor from './write/Editor';
import { useAppSelector } from '../redux/hooks';
import searchPois from './common/Map/searchPois';
import { LoadingSpin } from './common/LoadingSpin';
import MapComponent from './common/Map/MapComponent';
import { useGetUserInfoQuery } from '../api/queries';
import routesPedestrian from './common/Map/routesPedestrian';
import { startEndLocation, subInfoType } from '../redux/runSlice';
import { useCreateRoomMutation, useRunRegisterItemMutation } from '../api/queries';
import { runActionType, runNaturalLanType, locationNaturalLan, subInfo, initialize } from '../redux/runSlice';
import * as S from '../styles/Map.style';

const Map = () => {
    const dispatch = useDispatch();
    const newRoom = useCreateRoomMutation();
    const newRunItem = useRunRegisterItemMutation();
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
            const runRegisterFunc = await newRunItem[0]({
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

            const createRoomfunc = await newRoom[0]({
                title,
                max: people,
                name: userInfo.data?.user.user.nick as unknown as string,
                runItemId: runRegisterFunc.runItemId
            });
            if (newRunItem[1].isLoading || newRoom[1].isLoading) {
                return <LoadingSpin />;
            }
            navigate(`/runItemDetail/${runRegisterFunc.runItemId}`);
        }
    };
    return (
        <S.StyledMapBlock>
            <S.MapBlock>
                <MapComponent changeLatLon={changeLatLon} locationNutural={locationNutural} />
            </S.MapBlock>
            <S.EditorBlock>
                <Editor height="480px" onChangeField={onChangeLetter} title={title} body={body} />
            </S.EditorBlock>
            <S.CourseBlock>
                <S.Course>
                    <S.InputBlock>
                        <S.CourseInput
                            placeholder="출발지를 입력하세요"
                            value={startLocationNaturalLan}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(locationNaturalLan({ key: 'startLocationNaturalLan', value: e.target.value }));
                            }}
                        />
                        <S.ResearchIcon
                            className="material-symbols-outlined"
                            onClick={() => searchAddress(startLocationNaturalLan)}
                        >
                            search
                        </S.ResearchIcon>
                    </S.InputBlock>
                    <br />
                    <S.InputBlock>
                        <S.CourseInput
                            placeholder="도착지를 입력하세요"
                            value={endLocationNaturalLan}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(locationNaturalLan({ key: 'endLocationNaturalLan', value: e.target.value }));
                            }}
                        />
                        <S.ResearchIcon
                            className="material-symbols-outlined"
                            onClick={() => searchAddress(endLocationNaturalLan)}
                        >
                            search
                        </S.ResearchIcon>
                    </S.InputBlock>
                    <br />
                    <p>참여인원</p>
                    <S.AttendNumber type="number" min="0" max="20" value={people} onChange={onChangeRegister} />
                </S.Course>
                <S.StartBlock>
                    <p>출발시간</p>
                    <S.StartDateTime type="datetime-local" value={startDateTime} onChange={onChangeDate} />
                </S.StartBlock>
                <S.DistanceItem onClick={calDistance}>거리보기</S.DistanceItem>
                <br />
                <S.RunInfo>
                    <div>
                        거리 <S.SubRunInfo>{distance}km</S.SubRunInfo>
                    </div>
                    <div>
                        예상소요시간 <S.SubRunInfo>{durationTime}분</S.SubRunInfo>
                    </div>
                </S.RunInfo>
                <S.RegisterItem onClick={clickRegister}>등록하기</S.RegisterItem>
            </S.CourseBlock>
        </S.StyledMapBlock>
    );
};
export default Map;
