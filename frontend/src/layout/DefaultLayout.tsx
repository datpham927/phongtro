import React, { useEffect } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Auth } from '../feature';
import NavigateComponent from '../components/NavigateComponent';
import { apiGetDetailUser } from '../services/apiUser';
import { setIsLoginSuccess } from '../redux/auth/authSlice';
import { setDetailUser } from '../redux/user/userSlice';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from '../redux/hooks';
interface DefaultLayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const dispatch= useAppDispatch()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const toastContainer = (
  <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
  />
);
  return (
    <div className="h-full">
    <HeaderComponent />
    <NavigateComponent/>
    <div className="w-[1100px] mx-auto"> 
         {children} 
      </div>
    <FooterComponent/>
    <Auth/>
    {toastContainer}
  </div>
  )
};

export default DefaultLayout;  // Đảm bảo tên biến ở đây phải khớp với tên biến bạn đã định nghĩa ở trên.
