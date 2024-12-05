import { memo } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
interface ItemManagePostProps {
  id: string;
  thumb: string;
  price: string;
  startDate: string;
  expireDate?: string;
  status?: string;
  isApproved?: boolean;
  approval?: boolean;
  onClickApproval?: () => void;
  onClickEdit?: () => void;
  onClickDelete: () => void;
}

function ItemManagePost({
  id,
  thumb,
  price,
  startDate,
  expireDate,
  status,
  isApproved = false,
  approval = false,
  onClickApproval,
  onClickEdit,
  onClickDelete,
}: ItemManagePostProps) {
  return (
    <ul className="grid grid-cols-8 divide-x border-t border-slate-200">
      <li className="p-2 text-sm">{id}</li>
      <li className="p-2 text-sm">
        <img className="w-8 h-8" src={thumb} alt="Thumbnail" />
      </li>
      <li className="p-2 text-sm">{price}</li>
      <li className="p-2 text-sm">{startDate}</li>
      <li className="p-2 text-sm">{expireDate}</li>
      <li className="p-2 text-sm">{status}</li>
      <li className="p-2 text-sm">{isApproved ? "Đã duyệt" : "Chưa duyệt"}</li>
      <li className="flex p-3 justify-between">
        <button
          className="px-2  text-blue-400 text-xs rounded-md"
          onClick={(e) => {
            e.preventDefault();
            approval ? onClickApproval?.() : onClickEdit?.();
          }}
        >
          {approval ? "Duyệt" : <BorderColorIcon/>}
        </button>

        <button
          className="px-2  text-xs rounded-md"
          onClick={(e) => {
            e.preventDefault();
            onClickDelete();
          }}
        >
         <DeleteOutlinedIcon/>
        </button>
      </li>
    </ul>
  );
}

export default memo(ItemManagePost);
