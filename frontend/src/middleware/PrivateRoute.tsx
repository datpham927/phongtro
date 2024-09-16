import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  isLogged: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isLogged }) => {
  // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
  if (!isLogged) {
    return <Navigate to="/" />;
  }
  // Nếu đã đăng nhập, render children
  return <>{children}</>;
};

export default PrivateRoute;
