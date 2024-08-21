import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import SearchComponent from '../components/SearchComponent';
import ProvinceComponent from '../components/ProvinceComponent';
interface DefaultLayoutProps {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="h-full">
    <HeaderComponent />
    <div className="w-[1100px] mx-auto">
    <SearchComponent/>
    <ProvinceComponent />
      <div className="flex my-5 gap-4">
        <div className="w-[70%]">
         {children}
        </div>
        <div className="w-[30%]">
        </div>
      </div>
    <FooterComponent/>

    </div>
    
  </div>
  )
};

export default DefaultLayout;  // Đảm bảo tên biến ở đây phải khớp với tên biến bạn đã định nghĩa ở trên.
