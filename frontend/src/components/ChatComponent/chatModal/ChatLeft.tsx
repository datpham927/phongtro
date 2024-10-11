/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ReactLoading from 'react-loading';
// import ItemConversation from '../../item/ItemConversation';
import NotExit from '../../common/NotExit';
import ItemConversation from '../../ItemConversation';
import { IConversation } from '../../../interfaces/conversation';

interface ChatLeft {
    setConversation: React.Dispatch<React.SetStateAction<any>>;
    setIsOpenBoxChat: React.Dispatch<React.SetStateAction<boolean>>;
    conversation: IConversation|any;
    isOpenBoxChat: boolean;
    isLoading: boolean;
}
const ChatLeft: React.FC<ChatLeft> = ({
    setConversation,
    conversation,
    setIsOpenBoxChat,
    isOpenBoxChat,
    isLoading,
}) => {
    const [value, setValue] = useState<string>('');
    const [conversationsNew, setConversationsNew] = useState<IConversation[]>([]);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.user);
    const { conversations } = useAppSelector((state) => state.action);
  
  
    useEffect(() => {
        setConversationsNew(conversations);
    }, [conversations]);

    // // tìm kiếm
    // useEffect(() => {
    //     const filterConversations = conversations.filter((c) => {
    //         return formatUserName(c.members?.find((m) => m.user.id !== currentUser.id)?.user).includes(value);
    //     });
    //     setConversationsNew(filterConversations);
    // }, [value]);

    return (
        <div
            className={`${
                isOpenBoxChat ? 'tablet:hidden' : ''
            } tablet:w-full w-[300px] h-full border-solid border-r-[1px] border-r-gray-200`}
        >
            <div className="p-2">
                   <input id="search" placeholder="Tìm kiếm" 
                   className="flex  w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-sm outline-none" 
                   type="text" value=""/>
            </div>
            {!isLoading ? (
                conversationsNew?.length > 0 ? (
                    <div className="w-full h-full">
                        {conversationsNew?.map((c) => (
                            <ItemConversation
                                isActive={c.id===conversation?.id}
                                conversation={c}
                                userId={currentUser.id}
                                onClick={() => {
                                    setConversation(c); 
                                    setIsOpenBoxChat(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <NotExit label="Không có tin nhắn nào" />
                )
            ) : (
                <div className="w-full flex justify-center h-full items-center">
                <ReactLoading type="cylon" color="rgb(0, 136, 72)" />
            </div>
            )}
        </div>
    );
};

export default ChatLeft;
