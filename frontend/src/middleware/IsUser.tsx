import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { PATH } from '../utils/constant';

interface PrivateRouteProps {
  children: ReactNode;
}

const IsUser: React.FC<PrivateRouteProps> = ({ children }) => {
  const { type } = useAppSelector((state ) => state.user);
  // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
  if (type==="admin") {
    return <Navigate to={PATH.SYSTEM} />;
  }
  // Nếu đã đăng nhập, render children
  return <>{children}</>;
};

export default IsUser;
