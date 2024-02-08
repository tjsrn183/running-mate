import styled from 'styled-components';
import { CustomButton } from '../components/common/CustomButton';
import palette from '../lib/styles/palette';
export const StyledMapBlock = styled.div`
    position: relative;
    top: 100px;
    width: 100%;
    height: 700px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(7, 1fr);
`;
export const MapBlock = styled.div`
    background-color: black;
    grid-column: 2/5;
    grid-row: 1/7;
`;
export const EditorBlock = styled.div`
    grid-column: 5/8;
    grid-row: 1/7;
`;

export const CourseBlock = styled.div`
    border-radius: 4px;
    margin-left: 10px;
    grid-column: 8/10;
    grid-row: 1/6;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
`;
export const Course = styled.div`
    grid-row: 1/2;
    padding: 0px 16px 0px 9px;
    & .material-symbols-outlined {
        position: absolute;
    }
`;
export const StartBlock = styled.div`
    margin: 0 0 0 10px;
`;
export const StartDateTime = styled.input`
    border-radius: 4px;
    height: 30px;

    grid-row: 2/3;
`;
export const CourseInput = styled.input`
    width: 100%;
    height: 30px;
    padding-left: 30px;
`;
export const AttendNumber = styled.input`
    width: 100%;
    height: 30px;
`;
export const DistanceItem = styled(CustomButton)`
    color: ${palette.orange};
    background-color: ${palette.back_ground_orange};
    padding: 10px 100px;
    margin: 10px 10px 3px 10px;
    grid-row: 3/4;
    &:hover {
        background-color: ${palette.hover_gray};
    }
`;
export const ResearchIcon = styled.span`
    padding: 6px 3px;
    cursor: pointer;
`;
export const RunInfo = styled.div`
    margin: 20px 10px;
    color: gray;
    background-color: ${palette.back_ground_orange};
    padding: 20px;
    border-radius: 10px;
    grid-row: 4/5;
    h3 {
        color: black;
    }
`;
export const InputBlock = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
`;
export const RegisterItem = styled(CustomButton)`
    border-radius: 20px;
    margin: 1px 10px;
    padding: 10px 100px;
    grid-row: 5/6;
`;
export const SubRunInfo = styled.div`
    font-weight: bold;
    color: black;
    font-size: xx-large;
`;
