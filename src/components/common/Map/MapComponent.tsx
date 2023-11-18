import React, { RefObject, useRef, useState } from 'react';
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
interface latLng {
    _lat: number;
    _lng: number;
}
export interface resultData {
    _responseData: {
        addressInfo: {
            fullAddress: string;
            buildingName: string;
        };
    };
}
const MapComponent = ({ changeLatLon, locationNutural }: MapcomponentPropsType) => {
    const [resultData, setResultData] = useState<number[]>([]);
    const [locationNatural, setLocationNatural] = useState<string>('');
    const dispatch = useAppDispatch();
    const currentMapRef = useRef(null);
    const startMakerRef = useRef([]);
    const endMakerRef = useRef([]);
    const tData = new window.Tmapv2.extension.TData();
    const markerRef = useRef<any>([]);
    useFirstMountEffect(() => {
        const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
            center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
            width: '100%',
            height: '100%',
            zoom: 14
        });

        CURRENT_MAP.addListener('click', function onClick(evt: { latLng: latLng }) {
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
                onComplete: function (result: resultData) {
                    //데이터 로드가 성공적으로 완료 되었을때 실행하는 함수 입니다.

                    const arrResult = result._responseData.addressInfo;
                    const fullAddress = arrResult?.fullAddress.split(',');
                    const newRoadAddr = fullAddress[2];

                    setResultData([lat, lon]);
                    setLocationNatural(newRoadAddr);
                    currentMapRef.current = CURRENT_MAP;
                    dispatch(currentMap({ currentMapState: CURRENT_MAP }));
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

    const startEndMarker = (
        currentMapRef: RefObject<any> | null,
        startOrEnd: 'start' | 'end',
        lat: number,
        lon: number,
        markerArr: Array<any>,
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
                });
                totalMarker.forEach((element: any) => {
                    element.setMap(null);
                });
            }
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
