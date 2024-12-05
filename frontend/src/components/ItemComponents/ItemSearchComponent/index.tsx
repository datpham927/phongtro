import { memo } from "react";

interface ItemSearchComponentProps {
  title: string|any;
  icon: React.ReactNode; // Sử dụng `React.ReactNode` để nhận các giá trị icon khác nhau
  onClick: () => void|null;
  defaultText: string;
 imgUrl:string
}

function ItemSearchComponent({
  title,
  icon,
  onClick,
  defaultText,
  imgUrl
}: ItemSearchComponentProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between text-sm font-medium bg-white p-2 rounded-md hover:shadow-custom"
    >

      <img className="w-[12px] h-[12px]" src={imgUrl}/>
      <span
        className={`overflow-hidden overflow-ellipsis whitespace-nowrap ${title ? "text-black font-medium" : "text-gray-400"
        } `}
      >
        {title || defaultText}
      </span>
      <span className="flex items-center mx-2">{icon}</span>
    </div>
  );
}

export default memo(ItemSearchComponent);
