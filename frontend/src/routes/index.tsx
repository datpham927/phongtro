import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from "../utils/constant";
import { useAppSelector } from '../redux/hooks';
import { DetailPost, FilterPage, HomePage, ResetPassword } from '../pages/public';
import System from '../pages/system/System'; 
import DefaultLayout from '../layout/DefaultLayout';
import CreatePost from '../pages/system/CreatePost';
import ManagePost from '../pages/system/ManagePost';


const RouterPage = () => { 
  const { isLogged } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Route mặc định */} 
      <Route path={PATH.HOME} element={<DefaultLayout />}>
          <Route path='*' element={<Navigate to={PATH.HOME} />} />
          {/* Các route công khai */}
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.HOME__PAGE} element={<HomePage />} />
          <Route path={PATH.FILTER__PAGE} element={<FilterPage />} />
          <Route path={PATH.CATEGORY_FILTER__PAGE} element={<FilterPage />} />
          <Route path={PATH.DETAIL_POST} element={<DetailPost />} />
          {/* DefaultLayout */}
          </Route>
      {/* Route yêu cầu chưa đăng nhập */}
      {!isLogged && <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />}
  
      <Route path={PATH.SYSTEM} element={<System />}>
          <Route path={PATH.CREATE_POST} element={<CreatePost />} />
          <Route path={PATH.MANAGE_POST} element={<ManagePost />} />
          {/* <Route path={PATH.EDIT_ACCOUNT} element={<EditAccount />} /> */}
        </Route>
    </Routes>
  );
};

export default RouterPage;
