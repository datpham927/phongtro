import React, { useEffect, useState } from 'react'
import {   PaginationComponent } from '../../../components';
import { setLoading } from '../../../redux/action/actionSlice';
import { apiGetAllPaymentHistory } from '../../../services/apiInvoice';
import { useAppDispatch } from '../../../redux/hooks';
import { ITransaction } from '../../../interfaces/Transaction';
import ItemPaymentHistory from '../../../components/ItemInvoice/ItemPaymentHistory';
import NotExit from '../../../components/common/NotExit';

const PaymentHistory:React.FC = () => {
  const [lists, setList] = useState<ITransaction[]>([]);  
  const [totalPage, setTotalPage]=useState<number>(0)
  const [currentPage, setCurrentPage]=useState<number|any>(1)
  const dispatch= useAppDispatch()

  useEffect(() => {
    dispatch(setLoading(true)) 
    const fetchApi = async () => {
        let res;
        res = await apiGetAllPaymentHistory({ limit: 10, page: currentPage, sort: "ctime" });
        setList(res?.data?.invoices);
        setTotalPage(res?.data?.totalPage);
        dispatch(setLoading(false))  
        console.log(res?.data)
    };
    fetchApi();
  }, [currentPage]);
  

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
        <h1 className="flex text-2xl py-3 ">Lịch sử thanh toán</h1>
      </div>
      <div className="w-full ">
        <ul className="grid grid-cols-6 divide-x  border-solid border-[1px] border-slate-2200">
        <li className="transaction">	Thời gian</li>
        <li className="transaction">Mã giao dịch</li>
        <li className="transaction">Phí thanh toán</li>
        <li className="transaction">Số dư đầu</li>
        <li className="transaction">Số dư cuối</li>
        <li className="transaction">Mô tả</li> 
        </ul>
        <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
         {lists?.length>0 ? lists?.map((e) => {
            return  <ItemPaymentHistory transaction={e} />
          }):<NotExit label='Không có hóa đơn nào!'/>}
        </div> 
        {totalPage>1&&
         <PaginationComponent currentPage={currentPage}
                             setCurrentPage={setCurrentPage} 
                            totalPage={totalPage} />}
      </div>
    </div>
  );
}

export default PaymentHistory