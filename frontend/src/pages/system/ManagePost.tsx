import { useEffect, useState } from "react";
import SelectOption from "../../components/SelectOption";
import { useDispatch } from "react-redux";
import { apiGetPostForShop } from "../../services/apiPost";
import { useAppSelector } from "../../redux/hooks";
import { IDetailPost, IPost } from "../../interfaces/Post";
import ItemManagePost from "../../components/ItemManagePost";
import { checkStatus } from "../../utils/checkStatus";
import { transformId } from "../../utils/format/transformId";
import { formatDate } from "../../utils/format/formatDate";
import { ButtonComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utils/constant";
function ManagePost() {
  const [posts, setPost] = useState<IPost[]>([]);  
  
  const navigate=useNavigate()
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiGetPostForShop({limit:1,page:1});
      if (!response?.status) return;
      setPost(response?.data?.posts);
    };
    fetchApi();
  }, []);

// const handleDeletePost=async(postId)=>{
        
//   const response=await apiDeletePost(postId)
//   if(response.err==1){
//     toastMessage(response?.message)
//   }else{
//     toastMessage(response?.message)
//     dispatch(setIsUpdate())
//   }
// }


  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Quản lý tin đăng</h1>
        <div className="flex gap-6 text-center">
          <SelectOption
            className="w-auto"
            label="Lọc theo trạng thái"
            type=""
            options={[
              { id: 1, name: "Tin đang hiển thị" },
              { id: 2, name: "Tin hết Hạn" },
              // { id: 3, name: "Tin đang ẩn" },
            ]}
          />
          <ButtonComponent text="Đăng tin mới" className="bg-[#dc3545] text-white text-sm !py-0"  onClick={()=>navigate(`${PATH.SYSTEM}/${PATH.CREATE_POST}`)}/>
        </div>
      </div>
      <div className="w-full ">
        <ul className=" grid grid-cols-7 divide-x  border-solid border-[1px] border-slate-2200">
          <li className="p-[10px] font-semibold text-sm">Mã tin</li>
          <li className="p-[10px] font-semibold text-sm">Ảnh đại diện</li>
          <li className="p-[10px] font-semibold text-sm">Giá</li>
          <li className="p-[10px] font-semibold text-sm">Ngày bắt đầu</li>
          <li className="p-[10px] font-semibold text-sm">Ngày hết hạn</li>
          <li className="p-[10px] font-semibold text-sm">Trạng thái</li>
          <li className="p-[10px] font-semibold text-sm">Tùy chọn</li>
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
          {posts?.map((e) => {
             
            return (
              <ItemManagePost
                key={e?.id}
                avatar={e.thumb}
                 id={transformId(e?.id)  }
                expireDate={formatDate(e?.expire_at)}
                price={e?.price?.value}
                startDate={formatDate(e?.created_at)}
                status={checkStatus(e?.expire_at)}
                onClickEdit={() => { navigate(`${PATH.SYSTEM}/chinh-sua-bai-dang/${e.id}`)}}
                // onClickDelete={()=>{}}
                // setIsEdit={setIsEdit}
              />
            );
          })}
        </div>
        {/* {isEdit && <EditPostComponent setIsEdit={setIsEdit}  />} */}
      </div>
    </div>
  );
}

export default ManagePost;
