import React, { memo } from 'react';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';
import PaginationItem from './PaginationItem';

interface PaginationProps {
    totalPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, setCurrentPage }) => {
    const pageDisplay = () => {
        const pages = Array.from({ length: totalPage - 1 }, (_, i) => i + 1);
        const displayRange = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        return pages.filter(p => displayRange.includes(p));
    };

    return (
        <div className="flex w-4/12 mx-auto gap-4 justify-center my-10">
            {/* ------------ left ------------- */}
            <PaginationItem
                HandleOnClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                currentPage={currentPage}
            >
                <KeyboardArrowLeftIcon style={{ opacity: currentPage === 0 ? 0.4 : 1 }} />
            </PaginationItem>

            {currentPage >= 3 && (
                <div className="flex items-center">
                    <MoreHorizIcon fontSize="small" style={{ opacity: 0.3 }} />
                </div>
            )}

            {pageDisplay().map(p => (
                <PaginationItem key={p} HandleOnClick={() => setCurrentPage(p)} currentPage={currentPage}>
                    {p}
                </PaginationItem>
            ))}

            {currentPage < totalPage - 2 && (
                <div className="flex items-center">
                    <MoreHorizIcon fontSize="small" style={{ opacity: 0.3 }} />
                </div>
            )}

            {/* ------------ right ------------- */}
            <PaginationItem HandleOnClick={() => setCurrentPage(totalPage)} currentPage={currentPage}>
                {totalPage}
            </PaginationItem>

            <PaginationItem
                HandleOnClick={() => currentPage < totalPage && setCurrentPage(currentPage + 1)}
                currentPage={currentPage}
            >
                <ChevronRightIcon style={{ opacity: currentPage === totalPage ? 0.4 : 1 }} />
            </PaginationItem>
        </div>
    );
};

export default memo(Pagination);
