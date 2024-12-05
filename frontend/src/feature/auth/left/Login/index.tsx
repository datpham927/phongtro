import React, { useState } from 'react';
import { apiLogin } from '../../../../services/apiAuth';
import { useAppDispatch } from '../../../../redux/hooks';
import { setFeatureAuth, setLoading, setOpenFeatureAuth } from '../../../../redux/action/actionSlice';
import { setIsLoginSuccess } from '../../../../redux/auth/authSlice';
import { ButtonComponent, InputPassWordComponent } from '../../../../components';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();
    const handleSummit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Tài khoản hoặc mật khẩu không chính xác!');
            return;
        }
        dispatch(setLoading(true))
        const res = await apiLogin(email, password);
        dispatch(setLoading(false))
        if (res?.status) {
            localStorage.setItem('access_token', JSON.stringify(res.data.authorization.access_token));
            localStorage.setItem('client_id', JSON.stringify(res.data.user_id));
            // showNotification('Đăng nhập thành công!', true);
            dispatch(setOpenFeatureAuth(false));
            dispatch(setIsLoginSuccess(true));
            window.location.reload();
        } else {
            setError("Tài khoản hoặc mật khẩu không đúng");
        }
    };

    return (
        <>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Đăng nhập bằng email</h1>
                <p className="text-base">Nhập email và mật khẩu tài khoản của bạn</p>
            </div>
            <form className="flex flex-col gap-5">
                <div>
                    <div className="border-b-[1px]  py-2">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => {setEmail(e.target.value);setError('') } }
                            className="w-full text-base outline-none border-none "
                            placeholder="dpshopvn@gmail.com"
                        />
                    </div>
                    <InputPassWordComponent name='password'  value={password} placeholder="Nhập mật khẩu"
                     onChange={(e)=>{setPassword(e.target.value); setError('')}}  
                     />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <ButtonComponent  text='Đăng nhập' className='bg-pink-500 text-white' 
                       onClick={handleSummit}/>
                </div>
            </form>
            <div className="flex flex-col gap-1 w-full h-full ">
                <p className="text-sm text-primary cursor-pointer" onClick={() => dispatch(setFeatureAuth(2))}>
                    Quên mật khẩu?
                </p>
                <p className="flex gap-2 items-center text-secondary text-sm">
                    Chưa có tài khoản?
                    <span className="text-sm text-primary cursor-pointer" onClick={() => dispatch(setFeatureAuth(0))}>
                        Tạo tài khoản
                    </span>
                </p>
            </div>
        </>
    );
};

export default Login;


