import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { useNavigate, useParams } from 'react-router-dom'
import { IPost } from '../../../interfaces/Post';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { apiGetPost } from '../../../services/apiPost';
import { IFilterCategory, IFilterDouble } from '../../../interfaces/filter'; 
import { dataArea, dataPrice } from '../../../utils/data'; 
import { convertToMillion } from '../../../utils/convertMillion';
import { ItemNavbarComponent, ListNewPost, ListPostComponent, PaginationComponent, ProvinceComponent, SearchComponent } from '../../../components';
import { setLoading } from '../../../redux/action/actionSlice';
 

const HomePage:React.FC = () => { 
      const [listPosts, setListPost]=useState<IPost[]>([])
      const [totalPage, setTotalPage]=useState<number>(0)
      const [totalPost, setTotalPost]=useState<number>(0) 
      const [currentPage, setCurrentPage]=useState<number|any>(1)
      const { categories } = useAppSelector((state) => state.category);
      const dispatch= useAppDispatch();

      const navigate=useNavigate()
      const params = useParams();
      const queries = queryString.parse(location.search);

   useEffect(()=>{
       const { gia_tu, gia_den,dien_tich_tu,dien_tich_den,orderby, ...rest } = queries;
       dispatch(setLoading(true))
       const fetchApi= async()=>{
           const res = await apiGetPost({...rest,category_slug:params.category_slug, limit:10,
            price_from:gia_tu,
            price_to:gia_den,
            area_from:dien_tich_tu,
            area_to:dien_tich_den,
            sort:orderby
           })

         if(res.status){
             setListPost(res?.data?.posts)
             setTotalPage(res?.data?.totalPage)
             setTotalPost(res?.data?.totalPosts)
         }
         dispatch(setLoading(false))
       }   
       fetchApi()
   },[queries.page,params.category_slug,location.search])
  // cập nhật lại query
  useEffect(() => {
    const { page, ...queryParams } = queries;
    const updatedQueryParams =
             currentPage !== 0 
            ? { ...queryParams, page: currentPage, }
            : queryParams;
    const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
    navigate(`?${newQuery}`);
}, [currentPage]);
 
const handleCLickPrice = (item: IFilterDouble) => {
  const updatedQueryParams =  {  gia_tu: convertToMillion(item.min),gia_den: convertToMillion(item.max)}
  const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
  navigate(`?${newQuery}`);
};

const handleCLickArea=(item: IFilterDouble)=>{
  const updatedQueryParams ={dien_tich_tu: item.min, dien_tich_den: item.max }
  const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
  navigate(`?${newQuery}`);
}
const handleCLickCategory=(item: IFilterCategory)=>{
  navigate(`/${item.slug}`);
}

  return (
    <>
    <SearchComponent/>
    <ProvinceComponent />
      <div className="flex my-5 gap-4">
        <div className="w-[70%]">
          <ListPostComponent  data={listPosts} totalPost={totalPost} />
         { listPosts?.length>0&&
         <PaginationComponent currentPage={currentPage}
                             setCurrentPage={setCurrentPage} 
                            totalPage={totalPage} />}
        </div>
        <div className="w-[30%]">
          <ItemNavbarComponent isDouble title="Xem theo giá" content={dataPrice} handleOnClick={handleCLickPrice} />
          <ItemNavbarComponent isDouble title="Xem theo diện tích" content={dataArea} handleOnClick={handleCLickArea}/>
          <ItemNavbarComponent title="Danh mục cho thuê"  content={categories} handleOnClick={handleCLickCategory}/>
          <ListNewPost/>
        </div>
      </div>
    </>
  )
}

export default HomePage