import { memo } from "react";

function ProvinceItemComponent({ title, image }) {
  return (
    <div className="w-[190px] text-center bg-white rounded-md overflow-hidden shadow-custom mx-[10px]">
      <img className="w-full object-cover h-[110px]" src={image} alt="" />
      <div className="text-base py-2">{title}</div>
    </div>
  );
}

export default memo(ProvinceItemComponent);
