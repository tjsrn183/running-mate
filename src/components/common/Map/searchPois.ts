// (장소API) 통합 검색 함수
export const searchPois = ({ CURRENT_MAP, tData }: any) => {
    const searchKeyword = startLocation;

    const optionObj = {
        resCoordType: 'WGS84GEO',
        reqCoordType: 'WGS84GEO',
        count: 10
    };

    const params = {
        onComplete: function (result: any) {
            // 데이터 로드가 성공적으로 완료되었을 때 발생하는 이벤트입니다.
            const resultpoisData = result._responseData.searchPoiInfo.pois.poi;

            let innerHtml = ''; // Search Reulsts 결과값 노출 위한 변수
            const positionBounds = new window.Tmapv2.LatLngBounds(); //맵에 결과물 확인 하기 위한 LatLngBounds객체 생성

            for (const k in resultpoisData) {
                // POI 정보의 ID
                const id = resultpoisData[k].id;

                const name = resultpoisData[k].name;

                const lat = Number(resultpoisData[k].noorLat);
                const lon = Number(resultpoisData[k].noorLon);

                const frontLat = Number(resultpoisData[k].frontLat);
                const frontLon = Number(resultpoisData[k].frontLon);

                const markerPosition = new window.Tmapv2.LatLng(lat, lon);

                const fullAddressRoad = resultpoisData[k].newAddressList.newAddress[0].fullAddressRoad;

                const marker2 = new window.Tmapv2.Marker({
                    position: markerPosition,
                    icon: 'http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_' + k + '.png',
                    iconSize: new window.Tmapv2.Size(24, 38),
                    title: name,
                    map: CURRENT_MAP
                });
                console.log('띄리뽀뽀', result);
                innerHtml +=
                    "<li><img src='http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_" +
                    k +
                    ".png' style='vertical-align:middle;'/><span>" +
                    name +
                    '</span><br><span>' +
                    fullAddressRoad +
                    '</span><br><span>중심점: ' +
                    lat +
                    ',' +
                    lon +
                    '</span><br><span>입구점: ' +
                    frontLat +
                    ',' +
                    frontLon +
                    '</span></li>' +
                    markerArr.push(marker2);
                positionBounds.extend(markerPosition); // LatLngBounds의 객체 확장
            }
            innerHtml = '<ul>' + innerHtml + '</ul>';
            $('#apiResult').html(innerHtml); //searchResult 결과값 노출
            CURRENT_MAP.panToBounds(positionBounds); // 확장된 bounds의 중심으로 이동시키기
            CURRENT_MAP.zoomOut();
        },
        onProgress: function () {
            console.log('성공했습니다.');
        },
        onError: function () {
            console.log('실패했습니다.');
        }
    };
    tData.getPOIDataFromSearchJson(searchKeyword, optionObj, params);
};
