import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import palette from '../lib/styles/palette';

const Outtermost = styled.div`
    width: 100%;
    height: 500px;
    background-color: ${palette.back_ground_orange};
    position: relative;
`;

const Letter = styled.div`
    color: black;
    font-size: 30px;
    position: absolute;
    top: 200px;
    left: 300px;
`;

const MainTop = () => {
    const text = '하루 한시간 건강발걸음';

    return (
        <Outtermost>
            <Letter>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter.typeString(text).start();
                    }}
                    options={{
                        autoStart: true,
                        loop: true,
                        delay: 200
                    }}
                />
            </Letter>
        </Outtermost>
    );
};

export default MainTop;
