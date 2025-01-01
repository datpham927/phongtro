import React, { useEffect, useState } from 'react'
import { setLoading } from '../../../redux/action/actionSlice';
import { useAppDispatch } from '../../../redux/hooks';
import NotExit from '../../../components/common/NotExit';
import { IPostType } from '../../../interfaces/PostType';
import { apiGetAllPostType } from '../../../services/apiPosType';
import { formatNumber } from '../../../utils/format/formatNumber';
import parse from 'html-react-parser';

const PriceList:React.FC = () => {
  const [lists, setList] = useState<IPostType[]>([]);  
  const dispatch= useAppDispatch()

  useEffect(() => {
    const fetchApi = async () => {
        let res;
        dispatch(setLoading(true)) 
        res = await apiGetAllPostType();
        dispatch(setLoading(false)) 
        setList(res?.data);
    };

    fetchApi();
  }, []);

  return (
    <div className="w-full p-6 mb-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Bản giá dịch vụ</h1>
      </div>
      <div className="w-full h-full">
        <ul className="grid grid-cols-4 divide-x  border-solid border-[1px] border-slate-2200">
        <li className="transaction">Dịch vụ</li>
        <li className="transaction">Giá</li>
        <li className="transaction">Thời hạn (tháng)</li>
        <li className="transaction">Mô tả</li> 
        </ul>
        <div className="border-[1px] border-t-[2px] border-solid border-slate-200 h-full">
         {lists?.length>0 ? lists?.map((e) => {
            return <ul  className="grid grid-cols-4 divide-x border-t border-slate-200">
            <li  className="post-type-item">{e.name}</li>
            <li  className="post-type-item">{formatNumber(e.price)}</li>
            <li  className="post-type-item">{ e.expiration_time}</li>
            <li  className="post-type-item">{parse(e.description)}</li>
          </ul>
          }):<NotExit label='Không có thông tin!'/>}
        </div> 
      </div>
    </div>
  );
}

export default PriceList