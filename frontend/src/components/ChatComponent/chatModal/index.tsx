import  { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import { setConversations, setIsOpenChat } from '../../../redux/action/actionSlice';
import { apiGetConversations } from '../../../services/apiConversation';
import { IConversation } from '../../../interfaces/conversation';

const ChatModal = () => {
    const [conversation, setConversation] = useState<IConversation>();
    const [isOpenBoxChat, setIsOpenBoxChat] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpenChat,isLoadChat } = useAppSelector((state) => state.action);
    // const { loadDataConversation } = useAppSelector((state) => state.action);
    // const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (location.pathname.includes('message') && !isLoginSuccess) {
    //         navigate('/');
    //         dispatch(setOpenFeatureAuth(true));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [location.pathname]);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            const res = await apiGetConversations();
            res.status && dispatch(setConversations(res.data));
            setIsLoading(false);
        };
         fetchApi();
         
    // }, [loadDataConversation]);
    }, [isLoadChat]);
    // const { mobile_ui } = useAppSelector((state) => state.action);

    return (
        <div
            className={`tablet:fixed tablet:top-0 table:right-0 tablet:left-0 table:w-full  tablet:h-full absolute bottom-0 right-0 w-auto h-[460px] bg-white shadow-search rounded-md  duration-1000 origin-bottom-right z-[1000]  ${
                isOpenChat ? 'laptop:animate-active-openChat' : 'laptop:animate-active-openChatOff'
            }`}
        >
            <div className="flex justify-between px-4 py-1 border-solid border-b-[1px] border-b-gray-200">
                <div className="text-lg font-medium text-primary">Chat</div>
                <div className="flex gap-2 ">
                    <div className="text-secondary cursor-pointer" onClick={() => setIsOpenBoxChat(!isOpenBoxChat)}>
                        {isOpenBoxChat ? <WestIcon fontSize="small" /> : <EastIcon fontSize="small" />}
                    </div>
                    <div
                        className="text-secondary cursor-pointer"
                        onClick={() => { 
                            dispatch(setIsOpenChat(false));
                            setIsOpenBoxChat(false);
                        }}
                    >
                        <ExpandMoreIcon fontSize="large" />
                    </div>
                </div>
            </div>
            <div className="flex w-full h-full">
                <ChatLeft
                    setConversation={setConversation}
                    conversation={conversation}
                    setIsOpenBoxChat={setIsOpenBoxChat}
                    isOpenBoxChat={isOpenBoxChat}
                    isLoading={isLoading}
                />
                <ChatRight conversation={conversation} isOpen={isOpenBoxChat} />
            </div>
        </div>
    );
};

export default ChatModal;
