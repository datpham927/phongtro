import React, { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPost } from "../../interfaces/Post";
import parse from 'html-react-parser';
import { timeAgo } from "../../utils/format/timeAgo";
const ItemPostComponent:React.FC<{ props: IPost; isHome?: boolean }> =  ({props, isHome=false})=> {
  const {address,area,description,id,price,images,thumb,title,user,slug,created_at}=props
  const [hoverHeart, setHoverHeart] = useState(false);
  const params=useParams()
  return (
    <div className={`${isHome?"bg-[#fff9f3] border-red-custom":""} flex border-solid border-t-[1px]  p-4 `}>
      <div className={`${isHome?"w-[280px] h-[240px]":"w-[170px] h-[160px]"} block  relative  shrink-0 rounded-md overflow-hidden cursor-pointer`}>
        <Link  to={`/chi-tiet/${slug}/${id}`}>
          <img className="w-full h-full" src={thumb} alt="" />
        </Link>
        <span className="absolute  bg-[rgba(0,0,0,.5)] text-sm text-white px-1 rounded-md left-2 bottom-2">
          {images} ảnh
        </span>
        <span
          className={`absolute bottom-0 right-2    ${hoverHeart ? "text-red-500" : " text-white"
            }`}
          onMouseEnter={() => setHoverHeart(true)}
          onMouseLeave={() => setHoverHeart(false)}
        >
            <ion-icon name={`${hoverHeart ? "heart" : "heart-outline"}`} ></ion-icon>
        </span>
      </div>
      <div className="ml-3 flex-1">
        <Link  to={`/chi-tiet/${slug}/${id}`} className={` ${isHome?"text-orange-600 ":"text-[#3763e0]"} uppercase text-[14px] font-bold truncate-trailing line-clamp-2 cursor-pointer hover:underline`}>
          {title}
        </Link>
        <div className="flex justify-between my-2 items-center">
          <span className="text-green-500 text-base">{price.value}</span>
         {!isHome&& <>
          <span className="text-base">{area.value}</span>
          <Link  to={`/${params.category_slug?params.category_slug:"tinh-thanh"}/${address.city_slug}/${address.district_slug}`} className="text-sm hover:underline">{address?.district_name+", " +address?.city_name}</Link>
          <span className="text-sm text-[#aaa]">{timeAgo(created_at)}</span></>}
        </div>
        {isHome&&<div className="flex justify-between my-2 ">
        <Link  to={`/${params.category_slug?params.category_slug:"tinh-thanh"}/${address.city_slug}/${address.district_slug}`} className="text-sm hover:underline">{address?.district_name+", " +address?.city_name}</Link>
          <span className="text-sm text-[#aaa]">{timeAgo(created_at)}</span>
        </div>}

        <p className={`${isHome?"line-clamp-3":"line-clamp-2"} text-sm text-gray-500 truncate-trailing `}>{parse(description)}</p>
        <div className="flex justify-between  mt-3 ">
          <div className="flex gap-2 items-center">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src={
                user?.avatar
                  ? user?.avatar
                  : "https://phongtro123.com/images/default-user.png"
              }
              alt=""
            />
            <span className="text-sm text-gray-400"> {user?.name}</span>
          </div>
         {isHome&& <div className="flex gap-[10px]">
            <button className="text-sm bg-blue-custom px-2 py-1 text-white rounded-md ">
              Gọi {user?.phone}
            </button>
            <button className="text-sm border-solid border-[1px] border-blue-custom  px-2 py-1 text-blue-custom rounded-md ">
              Nhắn zalo
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default memo(ItemPostComponent);
