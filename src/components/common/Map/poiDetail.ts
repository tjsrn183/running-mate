//////////////////// POI 상세검색 함수
/*
const poiDetail = (poiId: any) => {
    const optionObj = {
        resCoordType: 'WGS84GEO'
    };
    const params = {
        onComplete: function (result: any) {
            // 응답받은 POI 정보
            const detailInfo = result._responseData.poiDetailInfo;

            const name = detailInfo.name;
            let bldAddr = detailInfo.bldAddr;
            const tel = detailInfo.tel;
            const bizCatName = detailInfo.bizCatName;
            const parkingString =
                detailInfo.parkFlag === '0' ? '주차 불가능' : detailInfo.parkFlag === '1' ? '주차 가능' : '';
            const zipCode = detailInfo.zipCode;
            const lat = Number(detailInfo.frontLat);
            const lon = Number(detailInfo.frontLon);

            const bldNo1 = detailInfo.bldNo1;
            const bldNo2 = detailInfo.bldNo2;

            const labelPosition = new window.Tmapv2.LatLng(lat, lon);

            if (bldNo1 !== '') {
                bldAddr += ` ${bldNo1}`;
            }
            if (bldNo2 !== '') {
                bldAddr += `-${bldNo2}`;
            }

            // 상세보기 클릭 시 지도에 표출할 popup창
            let content =
                "<div style=' border-radius:10px 10px 10px 10px;background-color:#2f4f4f; position: relative;" +
                "line-height: 15px; padding: 5 5px 2px 4; right:65px; width:150px; padding: 5px;'>" +
                "<div style='font-size: 11px; font-weight: bold ; line-height: 15px; color : white'>" +
                name +
                '</br>' +
                bldAddr +
                '</br>' +
                zipCode +
                '</br>' +
                bizCatName;

            if (tel !== '') {
                content += '</br>' + tel;
            }
            if (parkingString !== '') {
                content += '</br>' + parkingString;
            }

            content += '</div></div>';

            const labelInfo2 = new window.Tmapv2.Label({
                position: labelPosition,
                content: content,
                map: CURRENT_MAP
            });
            //popup 생성

            // popup들을 담을 배열에 팝업 저장
            labelArr.push(labelInfo2);

            CURRENT_MAP.setCenter(labelPosition);
        },
        onProgress: function () {
            console.log('성공했습니다.');
        },
        onError: function () {
            console.log('실패했습니다.');
        }
    };
    tData.getPOIDataFromIdJson(poiId, optionObj, params);
};
export default poiDetail;
*/
export {};
