import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from "../utils/constant";
import { useAppSelector } from '../redux/hooks';
import { DetailPost, FilterPage, HomePage, ResetPassword } from '../pages/public';


const RouterPage = () => { 
  const { isLogged } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {/* Route mặc định */}
      <Route path='*' element={<Navigate to={PATH.HOME} />} />

      {/* Các route công khai */}
      <Route path={PATH.HOME} element={<HomePage />} />
      <Route path={PATH.HOME__PAGE} element={<HomePage />} />
      <Route path={PATH.FILTER__PAGE} element={<FilterPage />} />
      <Route path={PATH.CATEGORY_FILTER__PAGE} element={<FilterPage />} />
      <Route path={PATH.DETAIL_POST} element={<DetailPost />} />
      {/* Route yêu cầu chưa đăng nhập */}
      {!isLogged && <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />}
    </Routes>
  );
};

export default RouterPage;
