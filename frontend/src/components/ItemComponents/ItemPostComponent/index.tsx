import React, { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IPost } from "../../../interfaces/Post";
import parse from 'html-react-parser';
import { timeAgo } from "../../../utils/format/timeAgo";
import { POST_TYPE_COLOR } from "../../../utils/constant";
const ItemPostComponent:React.FC<{ props: IPost  }> =  ({props })=> {
  const {address,area,description,id,price,images,priority,thumb,title,user,slug,created_at}=props
  const [hoverHeart, setHoverHeart] = useState(false);
  const params=useParams() 
  return (
      // style={{ backgroundColor: POST_TYPE_COLOR[post_type.priority - 1] }}>
    <div className={`${priority==1?" border-red-custom":""} flex border-solid border-t-[1px]  p-4 `}>
      <div className={`${priority==1?"w-[280px] h-[240px]":"w-[170px] h-[160px]"} block  relative  shrink-0 rounded-md overflow-hidden cursor-pointer`}>
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
        <Link  to={`/chi-tiet/${slug}/${id}`}
              style={{ color: POST_TYPE_COLOR[priority - 1] }}
              className={`uppercase text-[14px] font-bold truncate-trailing line-clamp-2 cursor-pointer hover:underline`}>
              {title}
        </Link>
        <div className="flex justify-between my-2 items-center">
          <span className="text-green-500 text-base">{price.value}</span>
         {priority!=1&& <>
          <span className="text-base">{area.value}</span>
          <Link  to={`/${params.category_slug?params.category_slug:"tinh-thanh"}/${address.city_slug}/${address.district_slug}`} className="text-sm hover:underline">{address?.district_name+", " +address?.city_name}</Link>
          <span className="text-sm text-[#aaa]">{timeAgo(created_at)}</span></>}
        </div>
        {priority==1&&<div className="flex justify-between my-2 ">
        <Link  to={`/${params.category_slug?params.category_slug:"tinh-thanh"}/${address.city_slug}/${address.district_slug}`} className="text-sm hover:underline">{address?.district_name+", " +address?.city_name}</Link>
          <span className="text-sm text-[#aaa]">{timeAgo(created_at)}</span>
        </div>}
        <div className={`${priority==1?"line-clamp-3":"line-clamp-2"} text-sm text-gray-500 truncate-trailing `}>{parse(description)}</div>
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
         {priority==1&& <div className="flex gap-[10px]">
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
