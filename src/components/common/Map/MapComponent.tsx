import React, { useEffect, useRef, useState } from 'react';
import useFirstMountEffect from '../../../hooks/useFirstMountEffect';
import { CustomButton, CustomButton2 } from '../CustomButton';
import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { runActionType, currentMap, runNaturalLanType } from '../../../redux/runSlice';

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

interface MapcomponentPropsType {
    changeLatLon: (payload: runActionType) => void;
    locationNutural: (payload: runNaturalLanType) => void;
}
const MapComponent = ({ changeLatLon, locationNutural }: MapcomponentPropsType) => {
    const [resultData, setResultData] = useState<any>([]);
    const [locationNatural, setLocationNatural] = useState<string>('');
    const dispatch = useAppDispatch();
    const currentMapRef = useRef<any>(null);
    const startMakerRef = useRef([]);
    const endMakerRef = useRef([]);
    const markerRef = useRef<any>([]);
    const tData = new window.Tmapv2.extension.TData();
    useFirstMountEffect(() => {
        const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
            center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
            width: '100%',
            height: '100%',
            zoom: 14
        });

        const labelArr: any = [];
        const lineArr: any = [];
        const poiId = null;

        CURRENT_MAP.addListener('click', function onClick(evt: any) {
            const mapLatLng = evt.latLng;
            const lon = mapLatLng._lng;
            const lat = mapLatLng._lat;

            const markerPosition = new window.Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng);
            //마커 올리기

            const marker1 = new window.Tmapv2.Marker({
                position: markerPosition,
                icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_p.png',
                iconSize: new window.Tmapv2.Size(24, 38),
                map: CURRENT_MAP,
                zIndex: 1
            });
            markerRef.current.push(marker1);
            const optionObj = {
                coordType: 'WGS84GEO', //응답좌표 타입 옵션 설정 입니다.
                addressType: 'A10' //주소타입 옵션 설정 입니다.
            };
            const params = {
                onComplete: function (result: any) {
                    //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.
                    const arrResult = result._responseData.addressInfo;
                    const fullAddress = arrResult?.fullAddress.split(',');
                    const newRoadAddr = fullAddress[2];
                    let jibunAddr = fullAddress[1];
                    if (arrResult.buildingName != '') {
                        //빌딩명만 존재하는 경우
                        jibunAddr += ' ' + arrResult.buildingName;
                    }

                    result = '새주소 : ' + newRoadAddr;
                    result += '지번주소 : ' + jibunAddr;
                    result += '좌표(WSG84) : ' + lat + ', ' + lon;
                    console.log(result);
                    setResultData([lat, lon]);
                    setLocationNatural(newRoadAddr);
                    currentMapRef.current = CURRENT_MAP;
                    dispatch(currentMap({ currentMapState: CURRENT_MAP }));
                    console.log('currentMapRef.current랑 current맵이랑 같은가', currentMapRef.current == CURRENT_MAP);
                    console.log('CURRENTMAP', CURRENT_MAP);
                },
                onProgress: function () {
                    console.log('onProgress');
                }, //데이터 로드 중에 실행하는 함수 입니다.
                onError: function () {
                    //데이터 로드가 실패했을때 실행하는 함수 입니다.
                    alert('onError');
                }
            };
            tData.getAddressFromGeoJson(lat, lon, optionObj, params);
        });
    }, []);

    useEffect(() => {
        console.log('과이연 이번에는요?', resultData);
    }, [resultData]);

    const startEndMarker = (
        currentMapRef: any,
        startOrEnd: 'start' | 'end',
        lat: number,
        lon: number,
        markerArr: any,
        totalMarker: []
    ) => {
        if (startOrEnd === 'start') {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                icon: 'http://topopen.tmap.co.kr/imgs/start.png',
                iconSize: new window.Tmapv2.Size(24, 38),
                map: currentMapRef,
                zIndex: 2
            });

            markerArr.push(marker);

            locationNutural({ key: 'startLocationNaturalLan', value: locationNatural });
            changeLatLon({ key: 'start', value: { lat: lat, lon: lon } });

            if (markerArr.length >= 2) {
                markerArr.forEach((element: any, index: number) => {
                    if (index == markerArr.length - 1) {
                        return;
                    }
                    element.setMap(null);
                    console.log('element사라져야하는데?');
                });
                totalMarker.forEach((element: any) => {
                    element.setMap(null);
                });
            }

            console.log('markerArr', markerArr);
        }
        if (startOrEnd === 'end') {
            const marker = new window.Tmapv2.Marker({
                position: new window.Tmapv2.LatLng(lat, lon),
                icon: 'http://topopen.tmap.co.kr/imgs/arrival.png',
                iconSize: new window.Tmapv2.Size(24, 38),
                map: currentMapRef,
                zIndex: 2
            });
            markerArr.push(marker);
            console.log('도착지 마커가 올라왔니?', marker.isLoaded());
            locationNutural({ key: 'endLocationNaturalLan', value: locationNatural });
            changeLatLon({ key: 'end', value: { lat: lat, lon: lon } });
            if (markerArr.length >= 2) {
                markerArr.forEach((element: any, index: number) => {
                    if (index == markerArr.length - 1) {
                        return;
                    }
                    element.setMap(null);
                });
                totalMarker.forEach((element: any) => {
                    element.setMap(null);
                });
            }
        }
    };

    return (
        <MapBlock id="map_div" style={{ width: '100%', height: '500px' }}>
            <StartEndButtonBlock>
                <CustomButton
                    style={{ marginRight: '30px' }}
                    onClick={() =>
                        startEndMarker(
                            currentMapRef.current,
                            'start',
                            resultData[0],
                            resultData[1],
                            startMakerRef.current,
                            markerRef.current
                        )
                    }
                >
                    출발
                </CustomButton>
                <CustomButton2
                    onClick={() =>
                        startEndMarker(
                            currentMapRef.current,
                            'end',
                            resultData[0],
                            resultData[1],
                            endMakerRef.current,
                            markerRef.current
                        )
                    }
                >
                    도착
                </CustomButton2>
            </StartEndButtonBlock>
        </MapBlock>
    );
};

export default MapComponent;
