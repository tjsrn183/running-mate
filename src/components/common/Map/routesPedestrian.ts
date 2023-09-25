const routesPedestrian = (start: any, end: any, CURRENT_MAP: any) => {
    return new Promise(function (resolve, reject) {
        const startx = start.lat;
        const starty = start.lon;
        const endx = end.lat;
        const endy = end.lon;
        const tData = new window.Tmapv2.extension.TData();

        const startLatLng = new window.Tmapv2.LatLng(startx, starty);
        const endLatLng = new window.Tmapv2.LatLng(endx, endy);
        const markerArr = [];
        const lineArr = [];
        const optionObj = {
            reqCoordType: 'WGS84GEO',
            resCoordType: 'WGS84GEO'
        };

        const params = {
            onComplete: function (result: any) {
                const resultData = result._responseData.features;
                // 결과 출력
                let appendHtml =
                    '보행자 경로안내: 총 거리 : ' + (resultData[0]?.properties.totalDistance / 1000).toFixed(1) + 'km,';
                appendHtml += ' 총 시간 : ' + (resultData[0]?.properties.totalTime / 60).toFixed(0) + '분';
                console.log('current맵임', CURRENT_MAP.currentMapState);
                console.log(appendHtml);

                const marker_s = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(startx, starty),
                    icon: 'http://topopen.tmap.co.kr/imgs/start.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: CURRENT_MAP.currentMapState,
                    zIndex: 3
                });

                const marker_e = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.LatLng(endx, endy),
                    icon: 'http://topopen.tmap.co.kr/imgs/arrival.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: CURRENT_MAP.currentMapState,
                    zIndex: 3
                });
                markerArr.push(marker_s);
                markerArr.push(marker_e);

                const jsonObject = new window.Tmapv2.extension.GeoJSON();
                const jsonForm = jsonObject.read(result._responseData);

                jsonObject.drawRoute(CURRENT_MAP.currentMapState, jsonForm, {}, function (e: any) {
                    for (const m of e.markers) {
                        markerArr.push(m);
                    }
                    for (const l of e.polylines) {
                        lineArr.push(l);
                    }

                    const positionBounds = new window.Tmapv2.LatLngBounds();
                    for (const polyline of e.polylines) {
                        for (const latlng of polyline.getPath().path) {
                            positionBounds.extend(latlng);
                        }
                    }

                    CURRENT_MAP.currentMapState.panToBounds(positionBounds);
                    CURRENT_MAP.currentMapState.zoomOut();
                });

                resolve('');
            },
            onProgress: function () {
                console.log('성공했습니다.');
            },
            onError: function () {
                console.error('API 호출 중 오류가 발생했습니다.');
                reject('API 호출 중 오류가 발생했습니다.');
            }
        };

        tData.getRoutePlanForPeopleJson(startLatLng, endLatLng, '출발지', '도착지', optionObj, params);
    });
};

export default routesPedestrian;
