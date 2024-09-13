import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Auth } from '../feature';
import NavigateComponent from '../components/NavigateComponent';
import { Outlet } from 'react-router-dom';
 
const DefaultLayout = () => { 
  return (
      <div className='w-full h-full  overflow-scroll'>
          <HeaderComponent />
          <NavigateComponent/>
          <div className="w-[1100px] mx-auto"> 
              <Outlet/>
          </div>
          <FooterComponent/>
          <Auth/>
          </div>
  )
};

export default DefaultLayout;  // Đảm bảo tên biến ở đây phải khớp với tên biến bạn đã định nghĩa ở trên.
