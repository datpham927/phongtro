import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom'
import { IPost } from '../../interfaces/Post'
import { getAllPost } from '../../services/apiPost'
import SearchComponent from '../../components/SearchComponent'
import ProvinceComponent from '../../components/ProvinceComponent'
import ListPostComponent from '../../components/ListPostComponent'
import ItemNavbarComponent from '../../components/ItemNavbarComponent'
import { dataArea, dataPrice } from '../../utils/data'
import PaginationComponent from '../../components/PaginationComponent'
import { IFilterDouble } from '../../interfaces/filter';

const HomePage:React.FC = () => { 
      const [listPosts, setListPost]=useState<IPost[]>([])
      const [totalPage, setTotalPage]=useState<number>(0)
      const [currentPage, setCurrentPage]=useState<number|any>(1)
      const navigate=useNavigate()
      const params = useParams();
       const queries = queryString.parse(location.search);
  //  console.log(params)


   useEffect(()=>{
    const { gia_tu, gia_den,dien_tich_tu,dien_tich_den, ...rest } = queries;
       const fetchApi= async()=>{
           const res = await getAllPost({...rest,category_slug:params.slug, limit:3,
            price_from:gia_tu,
            price_to:gia_den,
            area_from:dien_tich_tu,
            area_to:dien_tich_den,
           })
         if(res.status){
             setListPost(res?.data?.posts)
             setTotalPage(res?.data?.totalPage)
         }
       }   
       fetchApi()
   },[queries.page,params.slug,location.search])
  // cập nhật lại query
  useEffect(() => {
    const { page, ...queryParams } = queries;
    const updatedQueryParams =
             currentPage !== 0 
            ? { ...queryParams, page: currentPage, }
            : queryParams;
    const newQuery = queryString.stringify(updatedQueryParams);
    navigate(`?${newQuery}`);
}, [currentPage]);
 
const handleCLickPrice = (item: IFilterDouble) => {
  const updatedQueryParams ={  gia_tu: item.min,gia_den: item.max}
  const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
  navigate(`?${newQuery}`);
};

const handleCLickArea=(item: IFilterDouble)=>{
  const updatedQueryParams ={dien_tich_tu: item.min, dien_tich_den: item.max }
  const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
  navigate(`?${newQuery}`);
}
  return (
    <>
    <SearchComponent/>
    <ProvinceComponent />
      <div className="flex my-5 gap-4">
        <div className="w-[70%]">
          <ListPostComponent  data={listPosts} />
          <PaginationComponent currentPage={currentPage}
                             setCurrentPage={setCurrentPage} 
                            totalPage={totalPage} />
        </div>
        <div className="w-[30%]">
          <ItemNavbarComponent isDouble title="Xem theo giá" content={dataPrice} handleOnClick={handleCLickPrice} />
          <ItemNavbarComponent isDouble title="Xem theo diện tích" content={dataArea} handleOnClick={handleCLickArea}/>
        </div>
      </div>
    </>
  )
}

export default HomePage