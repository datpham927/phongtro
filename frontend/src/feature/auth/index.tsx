import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Login from './left/Login';
import Right from './Right/Right';
import Register from './left/Register';
import Forgot from './left/forgot';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFeatureAuth, setOpenFeatureAuth } from '../../redux/action/actionSlice';
import Overlay from '../../components/common/Overlay';

const Auth: React.FC = () => {
    const { openFeatureAuth, featureAuth } = useAppSelector((state) => state.action);
    const dispatch = useAppDispatch();

    const handleClose = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(setOpenFeatureAuth(false));
        dispatch(setFeatureAuth(0));
    };
    const handleOpen = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(setOpenFeatureAuth(true));
    };
    return (
        <>
            {openFeatureAuth && (
                <Overlay className="z-[1000]" onClick={handleClose}>
                    <div onClick={handleOpen} className="relative w-[800px] h-auto ">
                        <div className="flex w-full h-full bg-white m-auto rounded-lg items-center overflow-hidden">
                            <div className="flex flex-col gap-2 mobile:w-full w-4/6 px-10 py-6">
                                {featureAuth == 0 ? <Register /> : featureAuth == 1 ? <Login /> : <Forgot />}
                            </div>
                            <Right />
                        </div>
                        {/* -------------- */}
                        <div
                            onClick={handleClose}
                            className="absolute right-[-13px] top-[-13px] bg-blue-custom w-10 h-10 flex justify-center items-center rounded-full bg-primary text-white"
                        >
                            <CloseIcon fontSize="medium" />
                        </div>
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default Auth;
