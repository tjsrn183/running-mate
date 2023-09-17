import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const Button = styled.button`
    background-color: ${palette.back_ground_orange};
`;

interface PagenationType {
    total: number;
    limit: number;
    page: number;
    setPage: (page: number) => void;
}

const Pagenation = ({ total, limit, page, setPage }: PagenationType) => {
    const numPages = Math.ceil(total / limit);

    return (
        <div>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </Button>
            {Array(numPages).map((_, i) => (
                <Button key={i + 1} onClick={() => setPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined}>
                    {i + 1}
                </Button>
            ))}
            <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </button>
        </div>
    );
};

export default Pagenation;
