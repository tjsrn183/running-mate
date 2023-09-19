import React, { useEffect } from 'react';

const MapComponent = () => {
    useEffect(() => {
        const CURRENT_MAP = new window.Tmapv2.Map('map_div', {
            center: new window.Tmapv2.LatLng(37.5, 126.9), // 지도 초기 좌표
            width: '100%',
            height: '100%',
            zoom: 14
        });
    }, []);

    return <div id="map_div" style={{ width: '100%', height: '500px' }}></div>;
};

export default MapComponent;
