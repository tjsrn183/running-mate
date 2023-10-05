import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetRunItemListQuery } from '../api/queries';
import { LoadingSpin } from './common/LoadingSpin';
import { LocationType } from '../redux/runSlice';

const StyledItemBlock = styled.li`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 200px;
    cursor: pointer;
    list-style: none;

    &:hover {
        box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
    }
`;
const StyledListBlock = styled.div``;
const RunItemClick = styled(NavLink)`
    cursor: pointer;
`;

const ItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1rem;
    justify-items: center;
`;
const RunItem = ({ item }: { item: LocationType }) => {
    const { startLocationNaturalLan, endLocationNaturalLan, distance, durationTime } = item;
    console.log('프론트에서 찍어본 item', item);

    return (
        <StyledItemBlock>
            <div className="item-info-container">
                <p>출발: {startLocationNaturalLan}</p>
                <p>도착 :{endLocationNaturalLan}</p>
                <p>거리 : {distance}km</p>
                <p>소요시간 : {durationTime}분</p>
            </div>
        </StyledItemBlock>
    );
};
const RunItemList = () => {
    const [limit, setLimit] = useState(10);
    const runItemList = useGetRunItemListQuery(1);
    console.log('runItemList.data임', runItemList.data);
    console.log('runItemList임', runItemList);
    return (
        <StyledListBlock>
            {runItemList.isLoading ? (
                <LoadingSpin />
            ) : (
                <ItemList>
                    {runItemList.data?.slice(0, limit).map((item) => (
                        <RunItemClick
                            to={`/runItemDetail/${item.runItemId}`}
                            key={item.runItemId}
                            style={{ display: 'inline-block' }}
                        >
                            <RunItem item={item} />
                        </RunItemClick>
                    ))}
                </ItemList>
            )}
        </StyledListBlock>
    );
};
export default RunItemList;
