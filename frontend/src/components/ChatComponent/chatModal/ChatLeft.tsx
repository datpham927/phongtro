import React, { useEffect, useState } from 'react';
import {  useAppSelector } from '../../../redux/hooks';
import ItemConversation from '../../ItemComponents/ItemConversation';
import NotExit from '../../common/NotExit';
import { IConversation } from '../../../interfaces/conversation';
import { normalizeText } from '../../../utils/format/normalizeText';
import { iconLoad } from '../../../assets';

interface ChatLeftProps {
    setConversation: React.Dispatch<React.SetStateAction<any>>;
    setIsOpenBoxChat: React.Dispatch<React.SetStateAction<boolean>>;
    conversation: IConversation | any;
    isOpenBoxChat: boolean;
    isLoading: boolean;
}

const ChatLeft: React.FC<ChatLeftProps> = ({
    setConversation,
    conversation,
    setIsOpenBoxChat,
    isOpenBoxChat,
    isLoading,
}) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredConversations, setFilteredConversations] = useState<IConversation[]>([]);
    const { conversations } = useAppSelector((state) => state.action);

    useEffect(() => {
        setFilteredConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        const filtered = conversations.filter((conversation: IConversation) => {
            return normalizeText(conversation.receiver.name).includes(normalizeText(searchValue));
        });
        setFilteredConversations(filtered);
    }, [searchValue]);

    return (
        <div
            className={`${
                isOpenBoxChat ? 'tablet:hidden' : ''
            } tablet:w-full w-[300px] h-full border-solid border-r-[1px] border-r-gray-200`}
        >
            <div className="p-2">
                <input
                    id="search"
                    placeholder="Tìm kiếm"
                    className="flex w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-sm outline-none"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            {!isLoading ? (
                filteredConversations.length > 0 ? (
                    <div className="w-full h-full">
                        {filteredConversations.map((c) => (
                            <ItemConversation
                                key={c.id}
                                isActive={c.id === conversation?.id}
                                conversation={c}
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
                <div className="w-full h-full flex justify-center   items-center"> 
                    <img className='w-[50px]' src={iconLoad} />
                </div>
            )}
        </div>
    );
};

export default ChatLeft;
