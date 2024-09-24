import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { apiGetDetailUser } from '../services/apiUser';
import { setIsLoginSuccess } from '../redux/auth/authSlice';
import { setDetailUser } from '../redux/user/userSlice';
 

const useFetchDetailUser = () => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        const userId=localStorage.getItem('client_id');
            if(!userId)return;
        const fetchApiDetailUser = async () => {
            const res = await apiGetDetailUser(JSON.parse(userId));
            if (res.status) {
                dispatch(setIsLoginSuccess(true));
                dispatch(setDetailUser(res.data));
            }
        };
        fetchApiDetailUser()
    }, [dispatch]);
};

export default useFetchDetailUser;
