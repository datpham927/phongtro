import { memo  } from "react";
import { IPostType } from "../../../interfaces/PostType";
import { PATH } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
interface ItemManagePostTypeProps {
  postType: IPostType;
}

function ItemManagePostType({ postType}: ItemManagePostTypeProps) {
  const navigate=useNavigate()
 
  return (
    <ul className="grid grid-cols-5 divide-x border-t border-slate-200">
     <li className="p-2 text-sm">{postType.name}</li>
      <li className="p-2 text-sm">{postType.price}</li>
      <li className="p-2 text-sm">{postType.expiration_time}</li>
      <li className="p-2 text-sm">{parse(postType.description)}</li>  
      <li className="flex p-3 justify-between">
        <button
          className="px-2 bg-blue-500 text-white rounded-md h-fit mx-auto"
          onClick={(e) => {
            e.preventDefault();
            navigate(`${PATH.SYSTEM}/cap-nhat-bang-gia-dich-vu/${postType.id}`)
          }}
        >
      Chỉnh sửa
        </button>
      </li>
    </ul>
  );
}

export default memo(ItemManagePostType);