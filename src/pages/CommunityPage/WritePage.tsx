import React, { useEffect, useRef } from 'react';
import Editor from '../../components/write/Editor';
import Header from '../../components/common/Header';
import { styled } from 'styled-components';
import { CustomButton } from '../../components/common/CustomButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ChangeFieldWritePayload, changeWriteField, initialize } from '../../redux/writeSlice';
import { useWriteCommunityMutation, useGetUserInfoQuery, useEditCommunityMutation } from '../../api/queries';

import { useNavigate } from 'react-router-dom';
import { LoadingSpin } from '../../components/common/LoadingSpin';

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
function isLoading(load: boolean) {
    if (load) {
        return <LoadingSpin />;
    }
}
const CommunityWritePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const letterMutation = useWriteCommunityMutation();
    const editMutation = useEditCommunityMutation();
    const userInfo = useGetUserInfoQuery();

    const { title, body, postId } = useAppSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        postId: write.postId
    }));
    console.log('write페이지다아', body, title);
    const onChangeField: OnChangeFieldFunction = (payload) => dispatch(changeWriteField(payload));

    const registerLetter = async () => {
        let resultSetLetter;
        try {
            resultSetLetter = await letterMutation[0]({
                nick: userInfo.data?.user.user.nick,
                title,
                body
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
        if (resultSetLetter && resultSetLetter.postId) {
            navigate(`/community/${resultSetLetter.postId}`);
        }
    };
    const editButton = async () => {
        let newPost;
        try {
            newPost = await editMutation[0]({
                title,
                body,
                postId
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
        if (newPost && newPost.postId) {
            navigate(`/community/${postId}`);
        } else {
            navigate('/');
        }
    };
    useEffect(() => {
        isLoading(editMutation[1].isLoading);
        isLoading(letterMutation[1].isLoading);
    }, [editMutation[1].isLoading, letterMutation[1].isLoading]);

    useEffect(() => {
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);
    return (
        <ComunityWriteBlock>
            <Header />
            <EditorBlock>
                <Editor width="840px" height="500px" onChangeField={onChangeField} title={title} body={body} />
            </EditorBlock>
            {postId ? (
                <RegisterButton onClick={editButton}>수정하기</RegisterButton>
            ) : (
                <RegisterButton onClick={registerLetter}>등록하기</RegisterButton>
            )}
        </ComunityWriteBlock>
    );
};
export default CommunityWritePage;
