import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface BreadcrumbsProps {
    breadcrumbs: Array<{
        path: string;
        breadcrumb: string;
    }>;
}

const BreadcrumbComponent: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <div className="flex w-full items-center py-2">
            {breadcrumbs.map((b, index) => (
                <div key={index} className="flex items-center">
                    {b.path ? (
                        <Link
                            to={b.path}
                            className={`${
                                b.path === '' ? 'text-secondary cursor-pointer hover:underline' : 'text-[#1266dd]'
                            } flex whitespace-nowrap text-sm`}
                        >
                            {b.breadcrumb}
                        </Link>
                    ) : (
                        <span className="truncate-trailing line-clamp-1 text-sm font-semibold">
                            {b.breadcrumb}
                        </span>
                    )}
                    {b.path !== '' && index < breadcrumbs?.length - 1 && (
                        <span className="text-secondary">
                            <KeyboardArrowRightIcon fontSize="medium" />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default memo(BreadcrumbComponent);
