import { useEffect, useState } from "react";
import { transformId } from "../../../../utils/format/transformId";
import { ButtonComponent, PaginationComponent } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../utils/constant";
import { useAppDispatch } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/action/actionSlice";
import { apiDeleteCategory, apiGetAllCategory } from "../../../../services/apiCategory";
import ItemManageCategory from "../../../../components/ItemManageCategory";
import { ICategory } from "../../../../interfaces/category";
function ManageCategory() {
  const [categories, setCategories] = useState<ICategory[]>([]);  
  const [totalPage, setTotalPage]=useState<number>(0)
  const [currentPage, setCurrentPage]=useState<number|any>(1)
  const dispatch= useAppDispatch()

  const navigate=useNavigate()
  useEffect(() => {
    dispatch(setLoading(true)) 
    const fetchApi = async () => {
          const res=await apiGetAllCategory({ limit: 10, page: currentPage, sort: "ctime" });
        if (!res?.status) return;
        setCategories(res?.data?.categories);
        setTotalPage(res?.data?.totalPage-1);
        dispatch(setLoading(false))  
    };
    fetchApi();
  }, [currentPage]);
  

const handleDeletePost=async(category:ICategory)=>{
    if(confirm("Bạn có muốn xóa danh mục này không?")){
      if(!(category.post_quantity===0)){alert('Không thể xóa!') ;return}
       dispatch(setLoading(true))
       const cid=category.id
       const res=await apiDeleteCategory(cid);
      if(res.status){setCategories((prev) => prev.filter((c) => c.id !== cid));
      }else{alert("Không thành công")}
          dispatch(setLoading(false))
      }
}


  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Quản lý danh mục</h1>
        <div className="flex gap-6 text-center">
          <ButtonComponent text="Thêm danh mục" className="bg-[#dc3545] text-white text-sm "  onClick={()=>navigate(`${PATH.SYSTEM}/${PATH.CREATE_CATEGORY}`)}/>
        </div>
      </div>
      <div className="w-full ">
        <ul className=" grid grid-cols-6 divide-x  border-solid border-[1px] border-slate-2200">
          <li className="p-[10px] font-semibold text-sm">id</li>
          <li className="p-[10px] font-semibold text-sm">Tên danh mục</li>
          <li className="p-[10px] font-semibold text-sm">Tiêu đề</li>
          <li className="p-[10px] font-semibold text-sm">Mô tả</li>
          <li className="p-[10px] font-semibold text-sm">Số lượng bài viết</li>
          <li className="p-[10px] font-semibold text-sm">Tùy chọn</li>
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
          {categories?.map((e:ICategory) => {
            return (
              <ItemManageCategory
              id={transformId(e.id)}
              name={e.name}
              subTitle={e.sub_title}
              title={e.title}
              key={e.id}
              postQuantity={e.post_quantity}
              onClickDelete={()=>handleDeletePost(e)}
              onClickEdit={() => { navigate(`${PATH.SYSTEM}/chinh-sua-danh-muc/${e.id}`)}}
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

export default ManageCategory;
