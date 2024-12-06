import React from 'react';
import { Skeleton } from '@mui/material';

const SkeLetonDetailPage: React.FC = () => {

    return (
        <div className="flex gap-4 py-4">
            {/* Left Content */}
            <div className="flex-1 bg-white rounded-md p-4">
                {/* Image Slider Skeleton */}
                <Skeleton variant="rectangular" width="100%" height={300} className="mb-5" />
                {/* Post Title Section */}
                <div className="mb-4">
                    <Skeleton variant="text" width="70%" height={30} />
                </div>
                {/* Price, Area and Other Details */}
                <div className="flex gap-4 mb-4">
                    <Skeleton variant="rectangular" width={100} height={30} />
                    <Skeleton variant="rectangular" width={100} height={30} />
                    <Skeleton variant="rectangular" width={100} height={30} />
                </div>

                {/* Description Section */}
                <div className="mb-4">
                    <Skeleton variant="text" width="50%" className="mb-2" />
                    <Skeleton variant="rectangular" width="100%" height={100} />
                </div>

                {/* Table Section */}
                <div className="mb-4">
                    <Skeleton variant="text" width="50%" className="mb-2" />
                    <Skeleton variant="rectangular" width="100%" height={150} />
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[300px] bg-white rounded-md p-4">
                {/* User Info Section */}
                <div className="flex flex-col items-center mb-5">
                    <Skeleton variant="circular" width={80} height={80} className="mb-3" />
                    <Skeleton variant="text" width={"100%"} className="mb-2" />
                    <Skeleton variant="rectangular" width={"100%"} height={30} className="mb-2" />
                    <Skeleton variant="rectangular" width={"100%"} height={30} className="mb-2" />
                </div>

                {/* New Posts Section */}
                <div>
                    {[...Array(7)].map((_, index) => (
                        <div key={index} className="flex gap-3 items-center mb-4">
                            <Skeleton variant="rectangular" width={60} height={60} />
                            <div>
                                <Skeleton variant="text" width={150} className="mb-2" />
                                <Skeleton variant="text" width={100} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeLetonDetailPage;
