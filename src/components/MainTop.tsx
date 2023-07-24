import React from 'react';
import styled, { keyframes } from 'styled-components';
import Typewriter from 'typewriter-effect';

const Outtermost = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f5ebd7;
  position: relative;
`;

const Letter = styled.div`
  color: black;
  font-size: 40px;
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
            loop: true
          }}
        />
      </Letter>
    </Outtermost>
  );
};

export default MainTop;
