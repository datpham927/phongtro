import React from 'react'; // Optional in React 17+

const HeaderComponent: React.FC = () => {
  return (
    <>
      <div className="flex justify-between w-[1100px] mx-auto">
        <div>
          <img
            className="w-[240px] h-[70px] object-contain"
            src="https://phongtro123-hip06.vercel.app/static/media/logowithoutbg.bf008420f8d82e029a9b.png"
            alt="Logo"
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <a
            className="flex py-2 px-3 text-base justify-center rounded-md hover:underline"
            href="/login"
          >
            Đăng Nhập
          </a>
          <a
            className="flex py-2 px-3 text-base justify-center rounded-md hover:underline"
            href="/register"
          >
            Đăng ký
          </a>
          <a
            className="flex py-2 px-3 text-base justify-center rounded-md hover:underline bg-red-custom text-white"
            href="/"
          >
            Đăng tin mới
          </a>
        </div>
      </div>

      <div className="bg-blue-custom">
        <div className="w-[1100px] mx-auto flex items-center">
          <a
            aria-current="page"
            className="text-white text-sm font-semibold px-3 py-[10px] bg-red-custom hover:opacity-95"
            href="/"
          >
            Trang chủ
          </a>
        </div>
      </div>
    </>
  );
};


export default HeaderComponent;
