import React, { useEffect } from 'react';
import Editor from '../../components/write/Editor';
import Header from '../../components/common/Header';
import { styled } from 'styled-components';
import CustomButton from '../../components/common/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChangeFieldWritePayload, changeWriteField, initiallize } from '../../redux/writeSlice';
import { useWriteCummunityMutation, useGetUserInfoQuery } from '../../api/queries';

import { useNavigate } from 'react-router-dom';
const ComunityWriteBlock = styled.div`
    position: relative;
    height: 100vh;
`;
const EditorBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
`;
const RegisterButton = styled(CustomButton)`
    position: absolute;
    bottom: calc((100% - 650px) / 2);
    right: calc((100% - 850px) / 2);
    width: 20%;
    height: 50px;
    margin-bottom: 0;
`;
type OnChangeFieldFunction = (payload: ChangeFieldWritePayload) => void;
const CommunityWritePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const letterMutation = useWriteCummunityMutation();
    const setLetter = letterMutation[0];
    const userInfo = useGetUserInfoQuery();

    useEffect(() => {
        console.log('WritePage의 useEffect훅 마운트실행');
        return () => {
            console.log('WritePage의 useEffect훅 언!!마운트실행');
            dispatch(initiallize());
        };
    }, [dispatch]);
    const { title, body } = useAppSelector(({ write }) => ({
        title: write.title,
        body: write.body
    }));

    const onChangeField: OnChangeFieldFunction = (payload) => dispatch(changeWriteField(payload));

    const registerLetter = async () => {
        const resultSetLetter = await setLetter({ nick: userInfo.data.user.user.nick, title, body }).unwrap();
        console.log('프론트 resultSetLetter', resultSetLetter.postId);
        navigate(`/community/${resultSetLetter.postId}`);
    };

    return (
        <ComunityWriteBlock>
            <Header />
            <EditorBlock>
                <Editor width="840px" height="500px" onChangeField={onChangeField} title={title} body={body} />
            </EditorBlock>
            <RegisterButton onClick={registerLetter}>등록하기</RegisterButton>
        </ComunityWriteBlock>
    );
};
export default CommunityWritePage;
