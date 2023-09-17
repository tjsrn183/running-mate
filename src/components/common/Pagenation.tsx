import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const Button = styled.button`
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    background: ${palette.orange};
    color: white;
    font-size: 1rem;

    &:hover {
        background: ${palette.hover_orange};
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background: white;
    }

    &[aria-current] {
        background: ${palette.hover_orange};
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;
const PagenationBlock = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin: 16px;
`;
interface PagenationType {
    total: number;
    limit: number;
    page: number;
    setPage: (page: number) => void;
}

const Pagenation = ({ total, limit, page, setPage }: PagenationType) => {
    const numPages = Math.ceil(total / limit); //페이지 갯수 계산
    console.log('Pagenation에서 계산함', numPages);
    return (
        <PagenationBlock>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages)
                .fill(0)
                .map((_, i) => (
                    <Button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? 'page' : undefined}
                    >
                        {i + 1}
                    </Button>
                ))}
            <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </Button>
        </PagenationBlock>
    );
};

export default Pagenation;
