import { memo  } from "react";
import { IPostType } from "../../../interfaces/PostType";
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface ItemManagePostTypeProps {
  postType: IPostType;
  onClickEdit: () => void;
}

function ItemManagePostType({ postType ,onClickEdit}: ItemManagePostTypeProps) {
  // const [formData, setFormData] = useState({
  //   price: postType?.price || "",
  //   expiration_time: postType?.expiration_time || "",
  //   description: postType?.description || ""
  // });

  // // Debounce các giá trị
  // const debouncedData = {
  //   price: useDebounce(formData.price, 700),
  //   expiration_time: useDebounce(formData.expiration_time, 700),
  //   description: useDebounce(formData.description, 700),
  // };

  // // Hàm xử lý thay đổi
  // const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // }, []);

  // // Gọi API cập nhật
  // useEffect(() => {
  //   const updatePostType = async () => {
  //       const res = await apiUpdatePostType(postType.id, debouncedData);
  //       if (!res?.status) {
  //         alert("Cập nhật không thành công");
  //       }
  //   };
  //   updatePostType();
  // }, [debouncedData.price, debouncedData.expiration_time, debouncedData.description, postType.id]);

  return (
    <ul className="grid grid-cols-5 divide-x border-t border-slate-200">
     <li className="p-2 text-sm">{postType.name}</li>
      <li className="p-2 text-sm">{postType.price}</li>
      <li className="p-2 text-sm">{postType.expiration_time}</li>
      <li className="p-2 text-sm">{postType.description}</li>  
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
      </li>
    </ul>
  );
}

export default memo(ItemManagePostType);