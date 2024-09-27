import { useEffect, useState } from "react";
import SelectOption from "../../../components/SelectOption"; 
import { apiDeletePost, apiGetExpiredPostForShop, apiGetPostForShop } from "../../../services/apiPost"; 
import { IPost } from "../../../interfaces/Post";
import ItemManagePost from "../../../components/ItemManagePost";
import { checkStatus } from "../../../utils/checkStatus";
import { transformId } from "../../../utils/format/transformId";
import { formatDate } from "../../../utils/format/formatDate";
import { ButtonComponent, PaginationComponent } from "../../../components";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../utils/constant";
import { useAppDispatch } from "../../../redux/hooks";
import { setLoading } from "../../../redux/action/actionSlice";
function ManagePost() {
  const [posts, setPosts] = useState<IPost[]>([]);  
  const [totalPage, setTotalPage]=useState<number>(0)
  const [currentPage, setCurrentPage]=useState<number|any>(1)
  const [postFilter, SetPostFilter]=useState<number|any>(1)
  const dispatch= useAppDispatch()

  const navigate=useNavigate()
  useEffect(() => {
    dispatch(setLoading(true)) 
    const fetchApi = async () => {
        let res;
        if (postFilter === 1) {
          res = await apiGetPostForShop({ limit: 10, page: currentPage, sort: "ctime" });
        } else  if (postFilter === 2) {
          res = await apiGetExpiredPostForShop({ limit: 10, page: currentPage });
        }
        if (!res?.status) return;
        setPosts(res?.data?.posts);
        setTotalPage(res?.data?.totalPage);
        dispatch(setLoading(false))  
    };
  
    fetchApi();
  }, [currentPage, postFilter]);
  

const handleDeletePost=async(pid:string)=>{
    const res=await apiDeletePost(pid);
    if(res.status){
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== pid));
    }else{
        alert("Xóa không thành công")
    }
}


  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Quản lý tin đăng</h1>
        <div className="flex gap-6 text-center">
          <SelectOption
   setCode={SetPostFilter}
            className="w-auto"
            label="Lọc theo trạng thái"
            type=""
            options={[
              { code: 1, name: "Tin đang hiển thị" },
              { code: 2, name: "Tin hết Hạn" },
              // { id: 3, name: "Tin đang ẩn" },
            ]}
          />
          <ButtonComponent text="Đăng tin mới" className="bg-[#dc3545] text-white text-sm !py-0"  onClick={()=>navigate(`${PATH.SYSTEM}/${PATH.CREATE_POST}`)}/>
        </div>
      </div>
      <div className="w-full ">
        <ul className="grid grid-cols-8 divide-x  border-solid border-[1px] border-slate-2200">
          <li className="p-[10px] font-semibold text-sm">Mã tin</li>
          <li className="p-[10px] font-semibold text-sm">Ảnh đại diện</li>
          <li className="p-[10px] font-semibold text-sm">Giá</li>
          <li className="p-[10px] font-semibold text-sm">Ngày bắt đầu</li>
          <li className="p-[10px] font-semibold text-sm">Ngày hết hạn</li>
          <li className="p-[10px] font-semibold text-sm">Trạng thái</li>
          <li className="p-[10px] font-semibold text-sm">Xét duyệt</li>
          <li className="p-[10px] font-semibold text-sm">Tùy chọn</li>
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
          {posts?.map((e) => {
            return (
              <ItemManagePost
                key={e?.id}
                thumb={e.thumb}
                id={transformId(e?.id)  }
                expireDate={formatDate(e?.expire_at)}
                price={e?.price?.value}
                startDate={formatDate(e?.created_at)}
                status={checkStatus(e?.expire_at)}
                isApproved={e.is_approved}
                onClickEdit={() => { navigate(`${PATH.SYSTEM}/chinh-sua-bai-dang/${e.id}`)}}
                onClickDelete={()=>{handleDeletePost(e.id)}}
              />
            );
          })}
        </div>
        {totalPage>1&&
         <PaginationComponent currentPage={currentPage}
                             setCurrentPage={setCurrentPage} 
                            totalPage={totalPage} />}
      </div>
    </div>
  );
}

export default ManagePost;
