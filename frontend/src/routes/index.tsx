import { Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from "../utils/constant";
import { useAppSelector } from '../redux/hooks';
import { DetailPost, FilterPage, HomePage, ResetPassword } from '../pages/public';
import DefaultLayout from '../layout/DefaultLayout';
import PrivateRoute from '../middleware/PrivateRoute';
import { CreateCategory, CreatePost, CreateUser, DepositHistory, EditAccount, ManageApprovedPost, 
  ManageCategory, ManagePost,  ManagePostType,  ManageUser,  PaymentHistory,  PriceList,  UpdateCategory,  UpdatePost, UpdatePostType, UpdateUser } from '../pages/system';
import LayoutSystem from '../layout/LayoutSystem';
import IsUser from '../middleware/IsUser';


const RouterPage = () => { 
  const { isLogged } = useAppSelector((state) => state.auth);
  return (
    <Routes>
      <Route path={PATH.HOME} element={  <IsUser><DefaultLayout /></IsUser> }>
          <Route path='*' element={<Navigate to={PATH.HOME} />} />
          <Route path={PATH.HOME} element={<HomePage />} />
          <Route path={PATH.HOME__PAGE} element={<HomePage />} />
          <Route path={PATH.FILTER__PAGE} element={<FilterPage />} />
          <Route path={PATH.CATEGORY_FILTER__PAGE} element={<FilterPage />} />
          <Route path={PATH.DETAIL_POST} element={<DetailPost />} />
      </Route>
      {!isLogged && <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />}
      <Route path={PATH.SYSTEM} element={ <PrivateRoute isLogged={isLogged}><LayoutSystem /></PrivateRoute>}>
              <Route path={PATH.MANAGE_POST} element={<ManagePost />} />
              <Route path={PATH.CREATE_POST} element={<CreatePost />} />
              <Route path={PATH.UPDATE_POST} element={<UpdatePost />} />
              <Route path={PATH.EDIT_ACCOUNT} element={<EditAccount />} /> 
              {/* ---- user ----- */}
              <Route path={PATH.MANAGE_USER} element={<ManageUser />} /> 
              <Route path={PATH.UPDATE_USER} element={<UpdateUser />} /> 
              <Route path={PATH.CREATE_USER} element={<CreateUser />} /> 
              {/* ---- post --- */}
              <Route path={PATH.APPROVE_POST} element={<ManageApprovedPost />} /> 
              {/* ---- category --- */}
              <Route path={PATH.MANAGE_CATEGORY} element={<ManageCategory />} /> 
              <Route path={PATH.CREATE_CATEGORY} element={<CreateCategory />} /> 
              <Route path={PATH.UPDATE_CATEGORY} element={<UpdateCategory />} /> 
              {/* ------- invoice */}
              <Route path={PATH.DEPOSIT_HISTORY} element={<DepositHistory />} /> 
              <Route path={PATH.PAYMENT_HISTORY} element={<PaymentHistory />} />
              {/* ------- post type  */}
              <Route path={PATH.POST_TYPE_LIST} element={<PriceList />} /> 
              <Route path={PATH.MANAGE_POST_TYPE_LIST} element={<ManagePostType />} /> 
              <Route path={PATH.UPDATE_POST_TYPE} element={<UpdatePostType />} /> 
      </Route>
    </Routes>
  );
};

export default RouterPage;
