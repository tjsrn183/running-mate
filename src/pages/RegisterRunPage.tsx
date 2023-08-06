import React from 'react';
import Map from '../components/Map';
import Header from '../components/common/Header';

import styled from 'styled-components';
const MainPointBlock = styled.div``;

const RegisterRunPage = () => {
    return (
        <div>
            <Header />
            <div>
                <MainPointBlock>
                    <Map />
                </MainPointBlock>
            </div>
        </div>
    );
};
export default RegisterRunPage;
