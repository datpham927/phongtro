import React, { memo } from 'react';
import moment from 'moment';
interface MessageProps {
    own: boolean;
    message: {
        user_id: string;
        message: string;
        id: string;
        created_at:string
    };
}

 
const ItemMessage: React.FC<MessageProps> = ({ own, message }) => {
    return (
        <div className={`flex flex-col w-full h-auto ${own ? 'items-end' : ''}`}>
            <div className="flex items-center bg-gray-200 rounded-md">
                <p className={`max-w-[300px]  py-1 px-3 rounded-sm ${own ? 'bg-bgSecondary' : ' bg-gray-100'}`}>{message.message}</p>
            </div>
            <div className="text-xs text-secondary">
                {moment(message.created_at).locale('vi').fromNow()}</div>
        </div>
    );
};

 
export default memo(ItemMessage);
