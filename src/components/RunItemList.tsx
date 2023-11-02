import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetRunItemListQuery } from '../api/queries';
import { LoadingSpin } from './common/LoadingSpin';
import { LocationType } from '../redux/runSlice';
import palette from '../lib/styles/palette';
import { useAppSelector } from '../redux/hooks';

const StyledItemBlock = styled.li`
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    width: 500px;
    height: 200px;
    cursor: pointer;
    list-style: none;
    border-radius: 12px;
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
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-gap: 1rem;
    justify-items: center;
`;
const Image = styled.div`
    .image {
        border-radius: 12px;
        width: 180px;
        height: 180px;
        object-fit: cover;
        margin: 10px;
    }
`;
const SubInfo = styled.div`
    .location {
        font-size: 18px;
        font-weight: bold;
        .material-symbols-outlined {
            font-weight: bold;
            color: ${palette.orange};
        }
    }
    .distanceTime {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        color: gray;
    }
    .startTime {
        color: ${palette.orange};
        font-weight: 600;
    }
`;
const RunItem = ({ item }: { item: LocationType }) => {
    const { startLocationNaturalLan, endLocationNaturalLan, distance, durationTime, thumbnail, date } = item;

    const substring = (location: string) => {
        return location?.length < 33 ? location : location?.slice(0, 33) + '...';
    };
    return (
        <StyledItemBlock>
            <Image>
                <img className="image" src={thumbnail} alt="" />
            </Image>
            <SubInfo>
                <div className="location">
                    <p>
                        <span className="material-symbols-outlined">output_circle</span>{' '}
                        {substring(startLocationNaturalLan)}
                    </p>
                    <p>
                        <span className="material-symbols-outlined">input_circle</span>
                        {substring(endLocationNaturalLan)}
                    </p>
                </div>
                <div className="distanceTime">
                    {distance}km&nbsp;&nbsp;
                    {durationTime}분&nbsp;
                    <span className="startTime">{date?.split('T').join(' ')}</span>
                </div>
            </SubInfo>
        </StyledItemBlock>
    );
};
const RunItemList = () => {
    const [page, setPage] = useState(1);
    const runItemList = useGetRunItemListQuery(page);
    const observeDiv = useRef(null);
    const endRef = useRef(false);
    console.log('list에서 runItemList.data임', runItemList.data);
    console.log('list에서 runItemList.data.totalPage임', runItemList.data?.totalPage);
    console.log('list에서 runItemList임', runItemList);
    console.log('page다다다다', page);
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage(page + 1);
            if (page === runItemList.data?.totalPage) {
                endRef.current = true;
            }
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver);
        if (observeDiv.current) observer.observe(observeDiv.current);
        console.log('observeDiv임', observeDiv);
        console.log('observeDiv.current임', observeDiv.current);
        return () => observer.disconnect();
    }, [runItemList.data]);

    return (
        <StyledListBlock>
            {runItemList.isLoading ? (
                <LoadingSpin />
            ) : (
                <ItemList>
                    {runItemList.data?.ItemList.map((item: any) => (
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

            {!runItemList.isLoading && endRef.current !== true && <div ref={observeDiv}></div>}
        </StyledListBlock>
    );
};
export default RunItemList;
