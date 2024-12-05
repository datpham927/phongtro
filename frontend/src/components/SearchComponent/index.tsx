import  ModalRangeComponent from "../ModalComponent/ModalRangeComponent";
import { useEffect, useMemo, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {  useAppSelector } from "../../redux/hooks";
import queryString from "query-string";
import { getApiProvince } from "../../services/apiAddress";
import ItemSearchComponent from "../ItemComponents/ItemSearchComponent";
import { dataArea, dataPrice } from "../../utils/data";
import ModalRadioComponent from "../ModalComponent/ModalRadioComponent";
import { convertToMillion } from "../../utils/convertMillion";
import { convertMillionToDecimal } from "../../utils/format/convertMillionToDecimal";

function SearchComponent() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contentModel, setContentModel] = useState<any>([]);
  const [nameModel, setNameModel] = useState<string>();
  const [valueType, setValueType] = useState("");
  const [queriesModel, setQueriesModel] = useState<any>({});
  const [province, setProvince] = useState<any>([]);
  const params = useParams();
  const navigate=useNavigate()
  const queries = useMemo(() => queryString.parse(location.search), [location.search]);
  const { categories } = useAppSelector((state) => state.category);



  const handleOpenModal = (contentModel:any, type:any,name:string) => {
    setContentModel(contentModel);
    setOpenModal(!openModal);
    setValueType(type);
    setNameModel(name)
  };
  useEffect(() => {
    setQueriesModel({ ...queries, ...params  });
 }, [queries, params]);


  useEffect(() => {
    const fetchApi = async () => {
      const response = await getApiProvince();
      setProvince(response.data);
    };
    fetchApi();
  }, []);
 
  
  const handleOnSummit = (e: any, type: string) => {
    setQueriesModel((prev:any) => ({ ...prev, ...e }));
    const searchParams = location.search;
    let path: any;
    if (type === "category") {
      path = params.city_slug
        ? `/${e.category_slug}/${params.city_slug}${searchParams}`
        : `/${e.category_slug}${searchParams}`;
    } else if (type === "province") {
      path = params.category_slug
        ? `/${params.category_slug}/${e.city_slug}${searchParams}`
        : `/tinh-thanh/${e.city_slug}${searchParams}`;
    } else  if(type=='price'){
      setNameModel(e.title)
      const { gia_tu,gia_den, ...queryParams } = queries;
      const updatedQueryParams =  {  gia_tu: convertToMillion(e.min),gia_den: convertToMillion(e.max)}
      const newQuery = queryString.stringify({...queryParams, ...updatedQueryParams}, { sort: false });
        path =`?${newQuery}`
    }else  if(type=='area'){
      setNameModel(e.title)
      const { dien_tich_tu,dien_tich_den, ...queryParams } = queries;
      const updatedQueryParams =  {  dien_tich_tu:  e.min ,dien_tich_den:  e.max }
      const newQuery = queryString.stringify({...queryParams,...updatedQueryParams}, { sort: false });
        path =`?${newQuery}`
    }
    navigate(path);
    setOpenModal(false);
  };
  
  return (
    <div className=" grid grid-cols-5 gap-[8px] p-[10px] bg-amber-400 my-3 rounded-lg">
      <ItemSearchComponent
        icon={<ion-icon name="close-circle-outline"></ion-icon>}
        title={categories?.find(e => e.slug === queriesModel.category_slug)?.name}
        defaultText={"Tất cả"}
        imgUrl='https://phongtro123.com/images/building-icon.svg'
        onClick={() => handleOpenModal(categories, "category",'Chọn loại bất động sản')}
      />
     <ItemSearchComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        title={province?.find((e:any) => e.city_slug === params.city_slug)?.city_name}
        defaultText={"Toàn quốc"}
         imgUrl='https://phongtro123.com/images/location-icon.svg'
        onClick={() => handleOpenModal(province, "province",'Chọn tỉnh thành')}
      />
       <ItemSearchComponent
  icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
  title={ Number(queries.gia_den) === 999999
    ? "Trên 15 triệu"
    : queries.gia_tu && queries.gia_den
    ? `${convertMillionToDecimal(Number(queries.gia_tu))} - ${convertMillionToDecimal(Number(queries.gia_den))} triệu`
    : ""
  }
  defaultText="Chọn giá"
  imgUrl="https://phongtro123.com/images/price-icon.svg"
  onClick={() => handleOpenModal(dataPrice, "price", "Chọn giá")}
/>

<ItemSearchComponent
  icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
  title={ Number(queries.dien_tich_den) === 999999
    ? "Trên 90m2"
    : queries.dien_tich_tu && queries.dien_tich_den
    ? `${queries.dien_tich_tu} - ${queries.dien_tich_den}m2`
    : ""
  }
  defaultText="Chọn diện tích"
  imgUrl="https://phongtro123.com/images/acreage-icon.svg"
  onClick={() => handleOpenModal(dataArea, "area", "Chọn diện tích")}
/>

        <button
        className="flex items-center justify-center text-sm font-medium fon bg-blue-custom text-white p-2 rounded-md hover:shadow-custom"
      >
        <span className="flex items-center mx-1 text-lg">
          <ion-icon name="search-outline"></ion-icon>
        </span>
        <span>Tìm kiếm</span>
      </button>
      {openModal &&(
         ['category',"province"].includes(valueType) ?
        <ModalRadioComponent
          name={nameModel}
          onSummit={handleOnSummit}
          content={contentModel}
          type={valueType}
          setOpenModal={setOpenModal}
          isSelect={queriesModel}
        />:
        <ModalRangeComponent content={contentModel} 
        min={valueType==="price"?convertMillionToDecimal(Number(queries.gia_tu)): Number(queries.dien_tich_tu)}
        max={valueType==="price"?convertMillionToDecimal(Number(queries.gia_den)): Number(queries.dien_tich_den)} 
         setOpenModal={setOpenModal}
        onSummit={handleOnSummit} name={nameModel} type={valueType}/>
      ) 
      }
 
    </div>
  );
}

export default SearchComponent;
