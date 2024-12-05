import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string'; 
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { dataArea, dataPrice } from '../../../utils/data';
import { IFilterCategory, IFilterDouble } from '../../../interfaces/filter';
import { IPost } from '../../../interfaces/Post';
import { apiGetPost } from '../../../services/apiPost';
import { getDistrictByCity, getAddress, getWardByCityAndDistrict, getWardBelongCategoryByCityAndDistrict, getDistrictBelongCategoryByCity } from '../../../services/apiAddress';
import {   ItemNavbarComponent, ListNewPost, ListPostComponent, LocationComponent, PaginationComponent, SearchComponent, WelcomeComponent } from '../../../components';
import { convertToMillion } from '../../../utils/convertMillion';
import { setLoading } from '../../../redux/action/actionSlice';

const FilterPage: React.FC = () => {
  const [titleWelcome, setTitleWelcome] = useState<{ title: string; description: string }>({ title: '', description: '' });
  const [locations, setLocations] = useState<any[]>([]);
  const [listPosts, setListPost] = useState<IPost[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalPost, setTotalPost] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch= useAppDispatch()

  const navigate = useNavigate();
  const params = useParams();
  const queries = useMemo(() => queryString.parse(location.search), [location.search]);
  const category=categories?.find(e=>e.slug===params.category_slug||e.slug==="cho-thue-phong-tro")


  useEffect(() => {
    const fetchPosts = async () => {
      const { gia_tu, gia_den, dien_tich_tu, dien_tich_den, orderby, ...rest } = queries;
      dispatch(setLoading(true)) 
      const res = await apiGetPost({
        ...rest,
        ...params,
        limit: 10,
        price_from: gia_tu,
        price_to: gia_den,
        area_from: dien_tich_tu,
        area_to: dien_tich_den,
        sort: orderby,
      });
      dispatch(setLoading(false))
      if (res.status) {
        setListPost(res.data.posts);
        setTotalPage(res.data.totalPage);
        setTotalPost(res.data.totalPosts);
      }
    };

    fetchPosts();
  }, [queries, params]);

  useEffect(() => {
    const fetchLocations = async () => {
      dispatch(setLoading(true)) 
      let res;
      if (params.ward_slug) {
        res = await getAddress(params.ward_slug);
        if(category?.name&&res.data.ward_name&&category?.title){
          setTitleWelcome({
            title: `${category?.name} ${res.data.ward_name}, ${category?.title}`,
            description: `${category?.sub_title}`,
          });
        }
        setLocations([]);
        return;
      } 
      if (params.district_slug) {
            res = params.category_slug 
            ? await getWardBelongCategoryByCityAndDistrict(params.category_slug, params.city_slug, params.district_slug) 
            : await getWardByCityAndDistrict(params.city_slug, params.district_slug);
      } else if (params.city_slug) {
            res = params.category_slug 
            ? await getDistrictBelongCategoryByCity(params.category_slug, params.city_slug) 
            : await getDistrictByCity(params.city_slug);
      }
      if (res?.status) {
        setLocations(res.data.locations);
        if(category?.name&&category?.title){
          setTitleWelcome({
            title: `${category?.name} ${res.data?.district_name || res.data?.city_name}, ${category?.title}`,
            description: `${category?.sub_title}`,
          });
        }
      }
      dispatch(setLoading(false))
    };

    fetchLocations();
  }, [params,category]);

  useEffect(() => {
    const { page, ...queryParams } = queries;
    const updatedQueryParams = currentPage ? { ...queryParams, page: currentPage } : queryParams;
    const newQuery = queryString.stringify(updatedQueryParams);
    navigate(`?${newQuery}`);
  }, [currentPage]);

  const handleCLickPrice = (item: IFilterDouble) => {
    const updatedQueryParams =  {  gia_tu: convertToMillion(item.min),gia_den: convertToMillion(item.max)}
    const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
    navigate(`?${newQuery}`);
  };

  const handleCLickArea = (item: IFilterDouble) => {
    const updatedQueryParams = { ...queries, dien_tich_tu: item.min, dien_tich_den: item.max };
    const newQuery = queryString.stringify(updatedQueryParams, { sort: false });
    navigate(`?${newQuery}`);
  };

  const handleCLickCategory = (item: IFilterCategory) => {
    navigate(`/${item.slug}`);
  };
 
  return (
    <>
      <SearchComponent />
      <WelcomeComponent title={titleWelcome.title} description={titleWelcome.description} />
      {locations?.length > 0 && <LocationComponent data={locations} />}
      <div className="flex my-5 gap-4">
        <div className="w-[70%]">
          <ListPostComponent data={listPosts} totalPost={totalPost} />
          { listPosts?.length>0&&  <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />}
        </div>
        <div className="w-[30%]">
          <ItemNavbarComponent isDouble title="Xem theo giá" content={dataPrice} handleOnClick={handleCLickPrice} />
          <ItemNavbarComponent isDouble title="Xem theo diện tích" content={dataArea} handleOnClick={handleCLickArea} />
          <ItemNavbarComponent title="Danh mục cho thuê" content={categories} handleOnClick={handleCLickCategory} />
          <ListNewPost/>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
