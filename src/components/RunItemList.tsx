import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetRunItemListQuery } from '../api/queries';
import { LoadingSpin } from './common/LoadingSpin';
import { LocationType } from '../redux/runSlice';
import PedestrianViewMap from './common/Map/PedestrianViewMap';

const StyledItemBlock = styled.div`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    width: 320px;
    cursor: pointer;
    transition:
        transform 0.3s,
        box-shadow 0.3s;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
    }
`;
const StyledListBlock = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
`;
const RunItemClick = styled(NavLink)`
    cursor: pointer;
`;
const CardItem = styled.div``;
const InfoItem = styled.div``;

const RunItem = ({ item }: { item: LocationType }) => {
    const { start, end, startLocationNaturalLan, endLocationNaturalLan, distance, durationTime } = item;
    console.log('프론트에서 찍어본 item', item);

    return (
        <StyledItemBlock>
            <CardItem>
                <PedestrianViewMap start={start} end={end} />
            </CardItem>
            <InfoItem>
                <p>출발: {startLocationNaturalLan}</p>
                <p>도착 :{endLocationNaturalLan}</p>
                <p>거리 : {distance}km</p>
                <p>예상 소요시간 : {durationTime}분</p>
            </InfoItem>
        </StyledItemBlock>
    );
};
const RunItemList = () => {
    const [limit, setLimit] = useState(10);
    const runItemList = useGetRunItemListQuery(1);

    return (
        <StyledListBlock>
            {runItemList.isLoading ? (
                <LoadingSpin />
            ) : (
                <div>
                    {runItemList.data?.slice(0, limit).map((item) => (
                        <RunItemClick to={`/runItemDetail/${item.runItemId}`} key={item.runItemId}>
                            <RunItem item={item} />
                        </RunItemClick>
                    ))}
                </div>
            )}
        </StyledListBlock>
    );
};
export default RunItemList;
