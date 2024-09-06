import  { ModalRadioComponent } from "../ModalComponent";
import SearchItemComponent from "./SearchItemComponent";
import { useEffect, useMemo, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {  useAppSelector } from "../../redux/hooks";
import queryString from "query-string";
import { getApiProvince } from "../../services/apiAddress";

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

  interface SummitEvent {
    category_slug?: string;
    city_slug?: string;
  }
  
  const handleOnSummit = (e: SummitEvent, type: string) => {
    setQueriesModel((prev:any) => ({ ...prev, ...e }));
    const searchParams = location.search;
    let path: string;
    if (type === "category") {
      path = params.city_slug
        ? `/${e.category_slug}/${params.city_slug}${searchParams}`
        : `/${e.category_slug}${searchParams}`;
    } else if (type === "province") {
      path = params.category_slug
        ? `/${params.category_slug}/${e.city_slug}${searchParams}`
        : `/tinh-thanh/${e.city_slug}${searchParams}`;
    } else {
      return; 
    }
    navigate(path);
    setOpenModal(false);
  };
  
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const response = await apiPost({
  //       page: pageNumber || 0,
  //       ...contentSearch,
  //     });
  //     if (response.err !== 0) return;
  //     dispatch(setListPost(response));
  //   };
  //   fetchApi();
  // }, [pageNumber, evenSummit]);

  // const handleSearch = () => {
  //   setEvenSummit((prev) => !prev);
  //   const content = {
  //     areaNumber: queries?.area?.areaNumber,
  //     priceNumber: queries?.price?.priceNumber,
  //     categoryCode: queries?.categories?.code,
  //     provinceCode: queries?.province?.code,
  //   };
  //   setContentSearch(content);
  //   const text = `${
  //     queries.category ? queries.categories?.code : "Cho thuê tất cả"
  //   } ${queries.province.code ? `tỉnh ${queries.categories?.code}` : ""} ${
  //     queries.price?.priceNumber ? `giá ${queries.price?.priceNumber}` : ""
  //   } ${
  //     queries.area?.areaNumber ? `diện tích ${queries.area?.areaNumber}` : ""
  //   } `;
  // };
  return (
    <div className=" grid grid-cols-5 gap-[8px] p-[10px] bg-amber-400 my-3 rounded-lg">
      <SearchItemComponent
        icon={<ion-icon name="close-circle-outline"></ion-icon>}
        title={categories.find(e => e.slug === queriesModel.category_slug)?.name}
        defaultText={"Tất cả"}
        onClick={() => handleOpenModal(categories, "category",'Chọn loại bất động sản')}
      />
     <SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.province?.title}
        title={province.find((e:any) => e.city_slug === params.city_slug)?.city_name}
        defaultText={"Toàn quốc"}
        onClick={() => handleOpenModal(province, "province",'Chọn tỉnh thành')}
      />
        {/*<SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.price?.title}
        defaultText={"Chọn giá"}
        onClick={() => handleOpenModal(dataPrice, "price")}
      />
      <SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.area?.title}
        defaultText={"Chọn diện tích"}
        onClick={() => handleOpenModal(dataArea, "area")}
      />
      <button
        // onClick={handleSearch}
        className="flex items-center justify-center text-sm font-medium fon bg-blue-custom text-white p-2 rounded-md hover:shadow-custom"
      >
        <span className="flex items-center mx-1 text-lg">
          <ion-icon name="search-outline"></ion-icon>
        </span>
        <span>Tìm kiếm</span>
      </button> */}
      {openModal && (
        <ModalRadioComponent
          name={nameModel}
          onSummit={handleOnSummit}
          content={contentModel}
          type={valueType}
          setOpenModal={setOpenModal}
          isSelect={queriesModel}
        />
      )}
    </div>
  );
}

export default SearchComponent;
