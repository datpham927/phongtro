import React, { useEffect, useState } from 'react';
import {  useAppSelector } from '../../../redux/hooks';
import ReactLoading from 'react-loading';
import ItemConversation from '../../ItemConversation';
import NotExit from '../../common/NotExit';
import { IConversation } from '../../../interfaces/conversation';
import { normalizeText } from '../../../utils/format/normalizeText';

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
                <div className="w-full flex justify-center h-full items-center">
                    <ReactLoading type="cylon" color="rgb(0, 136, 72)" />
                </div>
            )}
        </div>
    );
};

export default ChatLeft;
