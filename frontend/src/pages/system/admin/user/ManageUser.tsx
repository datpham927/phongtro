import { useEffect, useState } from "react";
import { transformId } from "../../../../utils/format/transformId";
import { ButtonComponent, PaginationComponent } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../utils/constant";
import { useAppDispatch } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/action/actionSlice";
import { apiDeleteUser, apiGetAllUser } from "../../../../services/apiUser";
import ItemManageUser from "../../../../components/ItemComponents/ItemManageUser";
import { IUserDetail } from "../../../../interfaces/User";
function ManageUser() {
  const [users, setUsers] = useState<IUserDetail[]>([]);  
  const [totalPage, setTotalPage]=useState<number>(0)
  const [currentPage, setCurrentPage]=useState<number|any>(1)
  const dispatch= useAppDispatch()

  const navigate=useNavigate()
  useEffect(() => {
  
    const fetchApi = async () => {   
           dispatch(setLoading(true)) 
          const res=await apiGetAllUser({   page: currentPage, sort: "ctime" });
          dispatch(setLoading(false))  
          if (!res?.status) return;
        setUsers(res?.data?.users);
        setTotalPage(res?.data?.totalPage);
    };
    fetchApi();
  }, [currentPage ]);
  

const handleDeletePost=async(uid:any)=>{
    if(confirm("Bạn có muốn xóa người dùng này không?")){
      dispatch(setLoading(true))
      const res=await apiDeleteUser(uid);
      if(res.status){
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== uid));
      }else{
          alert("Không thể xóa")
      }
          dispatch(setLoading(false))
      }
}


  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Quản lý người dùng</h1>
        <div className="flex gap-6 text-center">
          <ButtonComponent text="Thêm người dùng" className="bg-[#dc3545] text-white text-sm "  onClick={()=>navigate(`${PATH.SYSTEM}/${PATH.CREATE_USER}`)}/>
        </div>
      </div>
      <div className="w-full h-full">
        <ul className=" grid grid-cols-7 divide-x  border-solid border-[1px] border-slate-2200">
          <li className="p-[10px] font-semibold text-sm">id</li>
          <li className="p-[10px] font-semibold text-sm">Ảnh đại diện</li>
          <li className="p-[10px] font-semibold text-sm">Tên tài khoản</li>
          <li className="p-[10px] font-semibold text-sm">Số điện thoại</li>
          <li className="p-[10px] font-semibold text-sm">vai trò</li>
          <li className="p-[10px] font-semibold text-sm">Số lượng bài viết</li>
          <li className="p-[10px] font-semibold text-sm">Tùy chọn</li>
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200 h-full">
          {users?.map((e) => {
             
            return (
              <ItemManageUser
                key={e?.id}
                avatar={e.avatar}
                 id={transformId(e?.id) }
                type={e.type}
                name={e.name}
                phone={e.phone}
                postQuantity={e?.post_quantity}
                onClickEdit={() => { navigate(`${PATH.SYSTEM}/chinh-sua-thong-tin-nguoi-dung/${e.id}`)}}
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

export default ManageUser;
