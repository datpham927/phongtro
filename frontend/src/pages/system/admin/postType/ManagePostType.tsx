import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../redux/hooks';
import { IPostType } from '../../../../interfaces/PostType';
import { setLoading } from '../../../../redux/action/actionSlice';
import { apiGetAllPostType } from '../../../../services/apiPosType';
import NotExit from '../../../../components/common/NotExit';
import ItemManagePostType from '../../../../components/ItemComponents/ItemManagePostType';
 

const ManagePostType:React.FC = () => {
  const [lists, setList] = useState<IPostType[]>([]);  
  const dispatch= useAppDispatch()
  useEffect(() => {
    const fetchApi = async () => {
        dispatch(setLoading(true)) 
        let res;
        res = await apiGetAllPostType();
        setList(res?.data);
        dispatch(setLoading(false)) 
    };
    fetchApi();
  }, []);
  

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Bản giá dịch vụ</h1>
      </div>
      <div className="w-full ">
        <ul className="grid grid-cols-5 divide-x  border-solid border-[1px] border-slate-2200">
        <li className="transaction">Dịch vụ</li>
        <li className="transaction">Giá</li>
        <li className="transaction">Thời hạn (tháng)</li>
        <li className="transaction">Mô tả</li> 
        <li className="transaction">Thao tác</li> 
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
         {lists?.length>0 ? lists?.map((e) => {
            return <ItemManagePostType  
            postType={e} key={e.id}  />
          }):<NotExit label='Không có thông tin!'/>}
        </div> 
      </div>
    </div>
  );
}

export default ManagePostType