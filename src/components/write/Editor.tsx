import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ChangeFieldWritePayload } from '../../redux/writeSlice';
import { useAppSelector } from '../../redux/hooks';
import useFirstMountEffect from '../../hooks/useFirstMountEffect';
import { useImgUploadCommunityMutation } from '../../api/queries';

const TitleInput = styled.input`
    font-size: 2rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid gray;
    margin-bottom: 2rem;
    width: 100%;
`;
interface WrapperProps {
    height?: string;
    width?: string;
}
const Wrapper = styled.div<WrapperProps>`
    padding-left: 10px;
    height: ${(props) => props.height};
    width: ${(props) => props.width};

    .ql-toolbar {
        background-color: #fffbdb;
    }
    .ql-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1rem;
        line-height: 1.5;
    }
`;
interface EditorProps {
    height?: string;
    width?: string;
    title?: string;
    body?: string;
    onChangeField?: (payload: ChangeFieldWritePayload) => void;
}

const Editor: React.FC<EditorProps> = ({ height, width, title, body, onChangeField }) => {
    const quillInstance = useRef<ReactQuill>(null);
    const editor = quillInstance?.current?.getEditor();
    const imgUpload = useImgUploadCommunityMutation();

    useFirstMountEffect(() => {
        console.log('customHook에서 body찍어봄', body);
        const editor = quillInstance?.current?.getEditor();
        if (editor) {
            editor.root.innerHTML = body;
        }
    }, [body]);
    const imageHandler = async () => {
        console.log('imageHandler 함수 실행됨');
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.addEventListener('change', async () => {
            const file = input?.files?.[0];
            const formData = new FormData();
            formData.append('img', file!);
            try {
                const result = await imgUpload[0](formData).unwrap();
                console.log('성공 시, 백엔드가 보내주는 데이터', result.url);
                const IMG_URL = result.url;
                const editor = quillInstance?.current?.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                console.log('에러');
            }
        });
    };
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote']
                ],
                handlers: {
                    image: imageHandler
                }
            }
        };
    }, []);
    const setValue = () => {
        onChangeField?.({
            key: 'body',
            value: editor.root.innerHTML
        });
    };
    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'image'];

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeField?.({
            key: 'title',
            value: e.target.value
        });
    };
    return (
        <Wrapper height={height} width={width}>
            <TitleInput placeholder="제목을 입력하세요.." onChange={onChangeTitle} value={title} />
            <ReactQuill
                ref={quillInstance}
                theme="snow"
                placeholder="플레이스 홀더"
                value={body}
                onChange={setValue}
                modules={modules}
                formats={formats}
                style={{ height, width }}
            />
        </Wrapper>
    );
};
export default Editor;
