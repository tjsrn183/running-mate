import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChangeFieldWritePayload } from '../../redux/writeSlice';
import { useAppSelector } from '../../redux/hooks';
import useFirstMountEffect from '../../hooks/useFirstMountEffect';

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
type quilltype = typeof Quill;
const Editor: React.FC<EditorProps> = ({ height, width, title, body, onChangeField }) => {
    const quillElement = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<quilltype | null>(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요..',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image']
                ]
            }
        });
    }, []);
    const quill = quillInstance.current;
    if (quill) {
        quill.on(
            'text-change',
            () => {
                onChangeField?.({
                    key: 'body',
                    value: quill.root.innerHTML
                });
            },
            [onChangeField]
        );
    }

    useFirstMountEffect(() => {
        quillInstance.current.innterHtml = body;
    }, [body]);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeField?.({
            key: 'title',
            value: e.target.value
        });
    };
    return (
        <Wrapper height={height} width={width}>
            <TitleInput placeholder="제목을 입력하세요.." onChange={onChangeTitle} value={title} />
            <div ref={quillElement} />
        </Wrapper>
    );
};
export default Editor;
