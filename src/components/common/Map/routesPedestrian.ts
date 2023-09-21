// (경로API) 보행자 경로 안내 API
export const routesPedestrian = ({ CURRENT_MAP, tData, markerArr, lineArr }: any) => {
    return new Promise(function (resolve, reject) {
        // 출발지, 목적지의 좌표를 조회
        const startx = $('#startx').val();
        const starty = $('#starty').val();
        const endx = $('#endx').val();
        const endy = $('#endy').val();

        const startLatLng = new window.Tmapv2.LatLng(starty, startx);
        const endLatLng = new window.Tmapv2.LatLng(endy, endx);

        const optionObj = {
            reqCoordType: 'WGS84GEO',
            resCoordType: 'WGS84GEO'
        };

        const params = {
            onComplete: function (result: any) {
                const resultData = result._responseData.features;

                //결과 출력
                let appendHtml =
                    '보행자 경로안내: 총 거리 : ' + (resultData[0].properties.totalDistance / 1000).toFixed(1) + 'km,';
                appendHtml += ' 총 시간 : ' + (resultData[0].properties.totalTime / 60).toFixed(0) + '분';

                console.log(appendHtml);

                // 시작마커설정
                const marker_s = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(starty, startx),
                    icon: 'http://topopen.tmap.co.kr/imgs/start.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: CURRENT_MAP
                });

                // 도착마커설정
                const marker_e = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(endy, endx),
                    icon: 'http://topopen.tmap.co.kr/imgs/arrival.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: CURRENT_MAP
                });
                markerArr.push(marker_s);
                markerArr.push(marker_e);

                // GeoJSON함수를 이용하여 데이터 파싱 및 지도에 그린다.
                const jsonObject = new window.Tmapv2.extension.GeoJSON();
                const jsonForm = jsonObject.read(result._responseData);

                jsonObject.drawRoute(CURRENT_MAP, jsonForm, {}, function (e: any) {
                    // 경로가 표출된 이후 실행되는 콜백 함수.

                    for (const m of e.markers) {
                        markerArr.push(m);
                    }
                    for (const l of e.polylines) {
                        lineArr.push(l);
                    }

                    const positionBounds = new window.Tmapv2.LatLngBounds(); //맵에 결과물 확인 하기 위한 LatLngBounds객체 생성
                    for (const polyline of e.polylines) {
                        for (const latlng of polyline.getPath().path) {
                            positionBounds.extend(latlng); // LatLngBounds의 객체 확장
                        }
                    }

                    CURRENT_MAP.panToBounds(positionBounds);
                    CURRENT_MAP.zoomOut();
                });

                resolve('');
            },
            onProgress: function () {
                console.log('성공했습니다.');
            },
            onError: function () {
                console.log('실패했습니다.');
            }
        };

        tData.getRoutePlanForPeopleJson(startLatLng, endLatLng, '출발지', '도착지', optionObj, params);
    });
};
