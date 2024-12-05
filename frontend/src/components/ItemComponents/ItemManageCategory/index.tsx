import { memo } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface ItemManageCategory {
  id: string;
  name: string;
  title: string;
  subTitle: string;
  postQuantity : number|any;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

function ItemManageCategory({
  id,
  name,
  title,
  subTitle,
  postQuantity,
  onClickEdit,
  onClickDelete,
}: ItemManageCategory) {
  return (
    <ul className="grid grid-cols-6 divide-x border-t border-slate-200">
      <li className="p-2 text-sm">{id}</li>
      <li className="p-2 text-sm">{name}</li>
      <li className="p-2 text-sm">{title}</li>
      <li className="p-2 text-sm">{subTitle}</li>
      <li className="p-2 text-sm">{postQuantity}</li>
      <li className="flex p-3 justify-between">
        <button
          className="px-2 bg-blue-500 text-white rounded-md h-fit"
          onClick={(e) => {
            e.preventDefault();
            onClickEdit();
          }}
        >
        <BorderColorIcon/>
        </button>

        <button
          className="px-2 bg-blue-500 text-white rounded-md h-fit"
          onClick={(e) => {
            e.preventDefault();
            onClickDelete();
          }}
        >
          Xóa
        </button>
      </li>
    </ul>
  );
}

export default memo(ItemManageCategory);
