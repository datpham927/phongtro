import React, { memo } from 'react';
import moment from 'moment';

interface MessageProps {
    own: boolean;
    message: {
        sender_id: string;
        message: string;
        id: string;
        createdAt:string
    };
}

// eslint-disable-next-line react-refresh/only-export-components
const ItemMessage: React.FC<MessageProps> = ({ own, message }) => {
    return (
        <div className={`flex flex-col w-full h-auto ${own ? 'items-end' : ''}`}>
            <div className="flex items-center ">
                <p className={`max-w-[300px]  py-1 px-3 rounded-sm ${own ? 'bg-bgSecondary' : ' bg-gray-100'}`}>{message.message}</p>
            </div>
            <div className="text-xs text-secondary">{moment(message.createdAt).fromNow()}</div>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(ItemMessage);
