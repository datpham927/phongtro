import React, { memo } from 'react';

interface PropsInterface {
    currentPage: number;
    children: React.ReactNode;
    handleOnClick: () => void;
}

const PaginationItem: React.FC<PropsInterface> = ({ currentPage, children, handleOnClick }) => {
    return (
        <button
            onClick={handleOnClick}
            className={`px-[18px] py-[10px] border border-[#f1f1f1] shrink-0 rounded-[5px] text-sm  text-black ${
                children === currentPage ? 'bg-[#e13427] text-white ' : 'bg-white'
            }`}
        >
            {children}
        </button>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(PaginationItem);
