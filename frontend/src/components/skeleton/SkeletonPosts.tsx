import React from 'react';
import { v4 as uuidv4 } from 'uuid';
const SkeletonPosts: React.FC<{ index: number }> = ({ index }) => {
    return (
        <div className="w-full">
          <div className="animate-pulse bg-white p-4 rounded-lg border">
      {/* Tổng kết */}
             <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>

      {/* Sắp xếp */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-6 bg-gray-300 rounded w-16"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
            {[...Array(index)].map(() => (
                 <div key={uuidv4()} className="py-4 w-full bg-white border rounded-lg animate-pulse">
                 <div className="flex gap-4">
                   {/* Ảnh */}
                   <div className="w-1/3 h-40 bg-gray-300 rounded-md"></div>
                   {/* Nội dung */}
                   <div className="flex-1 space-y-2">
                     <div className="h-5 bg-gray-300 rounded-md w-3/4"></div>
                     <div className="h-5 bg-gray-300 rounded-md w-1/2"></div>
                     <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                     <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
                     <div className="flex gap-2 mt-4">
                       <div className="h-10 bg-gray-300 rounded-md w-20"></div>
                       <div className="h-10 bg-gray-300 rounded-md w-20"></div>
                     </div>
                   </div>
                 </div>
               </div>
            ))}
        </div>
    </div>

    );
};

export default SkeletonPosts;
