import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { apiGetDetailUser } from '../services/apiUser';
import { setIsLoginSuccess } from '../redux/auth/authSlice';
import { setDetailUser } from '../redux/user/userSlice';
 

const useFetchDetailUser = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchApiDetailUser = async () => {
            const res = await apiGetDetailUser();
            if (res.status) {
                dispatch(setIsLoginSuccess(true));
                dispatch(setDetailUser(res.data));
            }
        };
        const access_token = localStorage.getItem('access_token');
        access_token && fetchApiDetailUser();
    }, [dispatch]);
};

export default useFetchDetailUser;
