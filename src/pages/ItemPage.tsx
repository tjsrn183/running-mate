import React from 'react';
import styled from 'styled-components';
import ItemDetail from '../components/ItemDetail';
import Header from '../components/common/Header';

const ItemPageBlock = styled.div``;
const ItemPage = () => {
    return (
        <ItemPageBlock>
            <Header />
            <ItemDetail />
        </ItemPageBlock>
    );
};
export default ItemPage;
