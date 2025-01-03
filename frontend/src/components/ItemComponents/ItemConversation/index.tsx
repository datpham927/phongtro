import React, { memo } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { noUser } from '../../../assets';
import { IConversation } from '../../../interfaces/conversation';

interface ItemConversationProps {
    conversation: IConversation;
    isActive: boolean;
    onClick?: () => void;
}
 
const ItemConversation: React.FC<ItemConversationProps> = ({ conversation, isActive, onClick }) => {
    
    return (
        <div
            className={`flex w-full gap-3 items-center ${
                isActive ? 'bg-[#f1f1f1] ' : conversation.totalUnreadMessages===0 ? 'bg-white  hover:bg-zinc-100 ' : 'bg-zinc-300 '
            } py-2 px-3 cursor-pointer `}
            onClick={onClick}
        >
            <div className="w-[35px] h-[35px] shrink-0 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover" src={conversation?.receiver?.avatar || noUser} />
            </div>
            <div className="flex flex-col w-full">
                <span className="font-medium w-auto ">{conversation?.receiver?.name}</span>
            </div>
            <div className='laptop:hidden text-secondary'>
                <KeyboardArrowRightIcon />
            </div>
        </div>
    );
};

 
export default memo(ItemConversation);
