import { memo } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ItemComponent from "../ItemComponent";
import { IPost } from "../../interfaces/Post";

interface ListComponentProps {
  data: IPost[]; // Sửa lại để khai báo đúng kiểu dữ liệu
}

const ListComponent: React.FC<ListComponentProps> = ({ data }) => {
  return (
    <div className="bg-white py-4 rounded-md shadow-custom">
      <div className="px-4">
        <h1 className="text-lg font-medium">Danh sách tin đăng</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sắp Xếp:</span>
          <ButtonComponent
            text="Mặc định"
            className="bg-primary-bg !py-1 text-sm"
          />
        </div>
      </div>

      <div className="mt-3">
        {data?.map((post) => ( <ItemComponent key={post.id} props={post} />  ))}
      </div>
    </div>
  );
};

export default memo(ListComponent);
