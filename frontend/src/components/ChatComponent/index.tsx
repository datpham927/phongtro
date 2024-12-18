import React, { useEffect, useState } from 'react';
import MessageIcon from '@mui/icons-material/Message'; 
import ChatModal from './chatModal';
import { setConversations, setIsOpenChat, setOpenFeatureAuth } from '../../redux/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'; 
import { apiGetConversations } from '../../services/apiConversation';

const ChatComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    // const { isLoginSuccess } = useAppSelector((state) => state.auth);
    const { isOpenChat } = useAppSelector((state) => state.action);
    const { isLogged } = useAppSelector((state) => state.auth);

    
    // const currentUser = useAppSelector((state) => state.user);
    // const { socketRef } = useAppSelector((state) => state.action);

    // useEffect(() => {
    //     socketRef?.on('getMessage', () => {
    //         dispatch(setLoadDataConversation());
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [socketRef]);
    useEffect(() => {
        if (isOpenChat) {
            setIsOpen(isOpenChat);
            return;
        }
        setTimeout(() => {
            setIsOpen(isOpenChat);
        }, 200);
    }, [isOpenChat]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetConversations();
            res.success && dispatch(setConversations(res.data));
        };
        isLogged&& fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="fixed bottom-5 right-10 z-[999] ">
            <div
                className="relative p-3 bg-sky-600 rounded-full text-white cursor-pointer"
                onClick={() => {
                    if (!isLogged) {
                        dispatch(setOpenFeatureAuth(true));
                        return;
                    }
                    dispatch(setIsOpenChat(true));
                }}
            >
                <MessageIcon fontSize="large" />
                {/* {unseenConversations > 0 && (
                    <div className="absolute text-[13px] px-[5px]  rounded-[50%] top-0 right-0 h-fit bg-[#A769FD]">
                        {unseenConversations}
                    </div>
                )} */}
            </div>
            {isOpen && <ChatModal />}
        </div>
    );
};

export default ChatComponent;
