import { memo } from "react";

interface ItemManageUserProps {
  id: string;
  avatar: string;
  type: string;
  phone?: string;
  name?: string;
  postQuantity?: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

function ItemManageUser({
  id,
  avatar,
  type,
  phone,
  name,
  postQuantity,
  onClickEdit,
  onClickDelete
}: ItemManageUserProps) {
  return (
    <ul className="grid grid-cols-7 divide-x border-solid border-t-[1px] border-slate-200">
      <li className="p-[10px] text-sm">{id}</li>
      <li className="p-[10px] text-sm">
        <img className="w-[40px] h-[40px]" src={avatar ? avatar : "https://phongtro123.com/images/default-user.png"} alt="" />
      </li>
      <li className="p-[10px] text-sm">{name}</li>
      <li className="p-[10px] text-sm">{phone}</li>
      <li className="p-[10px] text-sm">{type}</li>
      <li className="p-[10px] text-sm">{postQuantity}</li>

      <li className="flex p-[15px] text-sm justify-between">
        <button
          className="px-2 bg-blue-500 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            onClickEdit();
          }}
        >
          Edit
        </button>
        <button
          className="px-2 bg-blue-500 text-white rounded-md"
          onClick={(e) => {
            e.preventDefault();
            onClickDelete();
          }}
        >
          Delete
        </button>
      </li>
    </ul>
  );
}

export default memo(ItemManageUser);
