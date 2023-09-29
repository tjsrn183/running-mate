import React from 'react';
import useFirstMountEffect from '../../../hooks/useFirstMountEffect';

interface PedestrianViewMapPropsType {
    start: { lat: number; lon: number };
    end: { lat: number; lon: number };
}
const PedestrianViewMap = ({ start, end }: PedestrianViewMapPropsType) => {
    useFirstMountEffect(() => {
        const startx = start.lat;
        const starty = start.lon;
        const endx = end.lat;
        const endy = end.lon;
        const tData = new window.Tmapv2.extension.TData();
        const startLatlon = new window.Tmapv2.Latlon(startx, starty);
        const endLatlon = new window.Tmapv2.Latlon(endx, endy);
        const VIEW_MAP = new window.Tmapv2.Map('view_map_div', {
            center: new window.Tmapv2.Latlon(start.lat, start.lon),
            width: '100%',
            height: '100%',
            zoom: 14
        });
        const markerArr = [];
        const lineArr = [];
        const optionObj = {
            reqCoordType: 'WGS84GEO',
            resCoordType: 'WGS84GEO'
        };
        const params = {
            onComplete: function (result: any) {
                const marker_s = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.Latlon(startx, starty),
                    icon: 'http://topopen.tmap.co.kr/imgs/start.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: VIEW_MAP,
                    zIndex: 3
                });

                const marker_e = new window.Tmapv2.Marker({
                    position: new window.Tmapv2.Latlon(endx, endy),
                    icon: 'http://topopen.tmap.co.kr/imgs/arrival.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    map: VIEW_MAP,
                    zIndex: 3
                });
                markerArr.push(marker_s);
                markerArr.push(marker_e);

                const jsonObject = new window.Tmapv2.extension.GeoJSON();
                const jsonForm = jsonObject.read(result._responseData);

                jsonObject.drawRoute(VIEW_MAP, jsonForm, {}, function (e: any) {
                    for (const m of e.markers) {
                        markerArr.push(m);
                    }
                    for (const l of e.polylines) {
                        lineArr.push(l);
                    }

                    const positionBounds = new window.Tmapv2.LatlonBounds();
                    for (const polyline of e.polylines) {
                        for (const latlon of polyline.getPath().path) {
                            positionBounds.extend(latlon);
                        }
                    }

                    VIEW_MAP.panToBounds(positionBounds);
                    VIEW_MAP.zoomOut();
                });
            },
            onProgress: function () {
                console.log('진행중');
            },
            onError: function () {
                console.error('API 호출 중 오류가 발생했습니다.');
            }
        };
        tData.getRoutePlanForPeopleJson(startLatlon, endLatlon, '출발지', '도착지', optionObj, params);
    }, []);

    return <div id="view_map_div"></div>;
};
export default PedestrianViewMap;
