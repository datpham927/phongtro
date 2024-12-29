import React, { memo, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useAppSelector } from '../../../redux/hooks';
import NotExit from '../../common/NotExit';
import ItemMessage from '../../ItemComponents/ItemMessage';
import { apiAddMessage, apiGetMessages } from '../../../services/apiMessage';
import { IConversation } from '../../../interfaces/conversation';
import Pusher from 'pusher-js';
import ButtonOutline from '../../ButtonComponent/ButtonOutline';
import { ENV } from '../../../utils/config/ENV';import { v4 as uuidv4 } from 'uuid';
import { iconLoad } from '../../../assets';
interface Message {
    user_id: string;
    message: string;
    id: string;
    created_at: string;
}
const ChatRight: React.FC<{ conversation: IConversation |any; isOpen: boolean }> = ({ conversation, isOpen }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isOpenBox, setIsOpenBox] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const currentUser = useAppSelector((state) => state.user);
    const scroll = useRef<any>(null);
    useEffect(() => {
        if (isOpen) {setIsOpenBox(isOpen);return;}
        setTimeout(() => {setIsOpenBox(isOpen);}, 299);
    }, [isOpen]);   
    
    useEffect(() => {
        const pusher = new Pusher(ENV.PUSHER_APP_KEY, {
            cluster: ENV.PUSHER_APP_CLUSTER
        });
        const channel = pusher.subscribe( `chat-${currentUser.id}`);
        channel.bind('sendMessage', function(data:any) {
            setMessages(prevMessages => [...prevMessages, data]);
        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [currentUser.id]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await apiGetMessages(conversation.id);
            res.status && setMessages(res.data);
            setLoading(false);
        };
        !!conversation && fetchApi();
    }, [conversation]);
    
    const handleSend = async () => {
        if (value) {
            setLoading(true);
            const res = await apiAddMessage(conversation.id,value,conversation.receiver.id);
            setLoading(false);
            if (res.status) {
                setMessages((prev) => [...prev, res.data]);
                setValue('');
            }
        }
    };

    useEffect(() => {
        scroll.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);
    return (
        <>
            {isOpenBox && (
                <div
                    className={`tablet:w-full   h-[100%] ${
                        isOpen ? 'animate-active-openBoxChat w-[400px]' : 'animate-active-openBoxChatOff'
                    }`}
                >
                    {!isLoading ? (
                        conversation ? (
                            <div className="h-full w-full ">
                                <div className="p-3 tablet:h-[calc(100%-120px)] h-[calc(100%-150px)] justify-end w-full overflow-y-scroll ">
                                    <div className="flex flex-col gap-4 h-auto justify-end w-full ">
                                        {messages?.length > 0 ? (
                                            messages?.map((message) => (
                                                <div ref={scroll} key={uuidv4()} >
                                                    <ItemMessage
                                                        own={message.user_id === currentUser.id}
                                                        message={message}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <NotExit label="Chưa có tin nhắn nào" />
                                       )}   
                                    </div>
                                </div>
                                <div className="flex items-center px-3 py-1 border-solid border-y-[1px] border-y-gray-200">
                                    <textarea
                                        placeholder="Nhập nội dung tin nhắn"
                                        value={value}
                                        onChange={(e) => setValue(e.currentTarget.value)}
                                        className="w-full outline-none text-sm "
                                    ></textarea>
                                    <ButtonOutline className="laptop:hidden  " 
                                    onClick={()=>!isLoading&&handleSend()}
                                    >
                                    <SendIcon />
                                </ButtonOutline>
                                </div>
                                <ButtonOutline
                                    className="tablet:hidden w-full bg-indigo-500 text-white"
                                    onClick={handleSend}
                                >Gửi</ButtonOutline> 
                            </div>
                        ) : (<NotExit label="Xin chào" />)
                    ) : (
                        <div className="w-full flex justify-center h-full items-center">
                             <img className='w-[50px]' src={iconLoad} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default memo(ChatRight);
