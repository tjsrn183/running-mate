import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import useFirstMountEffect from '../../../hooks/useFirstMountEffect';
import { CustomButton, CustomButton2 } from '../CustomButton';
import styled from 'styled-components';

//import searchPois from './searchPois';
//import poiDetail from './poiDetail';
//import routesPedestrian from './routesPedestrian';
const MapBlock = styled.div`
    position: relative;
`;
const StartEndButtonBlock = styled.div`
    background-color: transparent;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 5rem;
    z-index: 1;
`;

const MapComponent = ({ setStartLocation, setEndLocation, startLocation, endLocation }: any) => {
    const [CURRENT_MAP, setCurrentMap] = useState<any>(null);
    useFirstMountEffect(() => {
        const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
            center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
            width: '100%',
            height: '100%',
            zoom: 14
        });
        const markerArr: any = [];
        const labelArr: any = [];
        const lineArr: any = [];
        const poiId = null;
        const tData = new window.Tmapv2.extension.TData();

        CURRENT_MAP.addListener('click', function onClick(evt: any) {
            const mapLatLng = evt.latLng;

            const markerPosition = new window.Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng);
            //마커 올리기
            const marker1 = new window.Tmapv2.Marker({
                position: markerPosition,
                icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
                iconSize: new window.Tmapv2.Size(24, 38),
                map: CURRENT_MAP
            });

            const lon = mapLatLng._lng;
            const lat = mapLatLng._lat;

            const optionObj = {
                coordType: 'WGS84GEO', //응답좌표 타입 옵션 설정 입니다.
                addressType: 'A10' //주소타입 옵션 설정 입니다.
            };
            const params = {
                onComplete: function (result: any) {
                    //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.
                    const arrResult = result._responseData.addressInfo;

                    const fullAddress = arrResult.fullAddress.split(',');
                    const newRoadAddr = fullAddress[2];
                    let jibunAddr = fullAddress[1];
                    if (arrResult.buildingName != '') {
                        //빌딩명만 존재하는 경우
                        jibunAddr += ' ' + arrResult.buildingName;
                    }
                    if (lat && lon) {
                        setStartLocation[0](lat);
                        setStartLocation[1](lon);
                    }

                    result = '새주소 : ' + newRoadAddr;
                    result += '지번주소 : ' + jibunAddr;
                    result += '좌표(WSG84) : ' + lat + ', ' + lon;
                    console.log(result);
                },
                onProgress: function () {
                    console.log('성공했습니다.');
                }, //데이터 로드 중에 실행하는 함수 입니다.
                onError: function () {
                    //데이터 로드가 실패했을때 실행하는 함수 입니다.
                    alert('onError');
                }
            };
            tData.getAddressFromGeoJson(lat, lon, optionObj, params);
        });

        setCurrentMap(CURRENT_MAP);

        //     searchPois();
        //  poiDetail();
        // routesPedestrian();
    }, []);
    const startClick = (CURRENT_MAP: any) => {
        const marker_s = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(startLocation[1], startLocation[0]),
            icon: 'http://topopen.tmap.co.kr/imgs/start.png',
            iconSize: new window.Tmapv2.Size(24, 38),
            map: CURRENT_MAP
        });
        setStartLocation([startLocation[0], startLocation[1]]);
    };

    return (
        <MapBlock id="map_div" style={{ width: '100%', height: '500px' }}>
            <StartEndButtonBlock>
                <CustomButton
                    style={{ marginRight: '30px' }}
                    onClick={() => {
                        startClick(CURRENT_MAP);
                    }}
                >
                    출발
                </CustomButton>
                <CustomButton2>도착</CustomButton2>
            </StartEndButtonBlock>
        </MapBlock>
    );
};

export default MapComponent;
