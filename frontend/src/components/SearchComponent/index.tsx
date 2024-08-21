import SearchItemComponent from "./SearchItemComponent";

 
function SearchComponent() {
//   const dispatch = useDispatch();
//   const [hideModal, setHideModal] = useState(false);
//   const [content, setContent] = useState([]);
//   const [name, setName] = useState("");
//   const [queries, setQueries] = useState({});
//   const [isSelectValue, setIsSelectValue] = useState({});
//   const [evenSummit, setEvenSummit] = useState(false);
//   const [province, setProvince] = useState([]);
//   const [contentSearch, setContentSearch] = useState({});
//   const { price, area } = useSelector((state) => state.app);
//   const location = useLocation();
//   const pageNumber = location.state;
//   const { categories } = useSelector((state) => state.category);
//   const handleHideModal = (content, name) => {
//     setContent(content);
//     setHideModal(!hideModal);
//     setName(name);
//   };

//   useEffect(() => {
//     const fetchApi = async () => {
//       const response = await apiProvince();
//       setProvince(response.data);
//     };
//     fetchApi();
//   }, []);

//   const handleSummit = ({ min, max, code, ...query }) => {
//     setQueries((prev) => ({ ...prev, ...query }));
//     setIsSelectValue({
//       min,
//       max,
//       code,
//     });
//   };

//   useEffect(() => {
//     const fetchApi = async () => {
//       const response = await apiPost({
//         page: pageNumber || 0,
//         ...contentSearch,
//       });
//       if (response.err !== 0) return;
//       dispatch(setListPost(response));
//     };
//     fetchApi();
//   }, [pageNumber, evenSummit]);
//   const handleSearch = () => {
//     setEvenSummit((prev) => !prev);
//     const content = {
//       areaNumber: queries?.area?.areaNumber,
//       priceNumber: queries?.price?.priceNumber,
//       categoryCode: queries?.categories?.code,
//       provinceCode: queries?.province?.code,
//     };
//     setContentSearch(content);
//     const text = `${
//       queries.category ? queries.categories?.code : "Cho thuê tất cả"
//     } ${queries.province.code ? `tỉnh ${queries.categories?.code}` : ""} ${
//       queries.price?.priceNumber ? `giá ${queries.price?.priceNumber}` : ""
//     } ${
//       queries.area?.areaNumber ? `diện tích ${queries.area?.areaNumber}` : ""
//     } `;
//   };

  return (
    <div className=" grid grid-cols-5 gap-[8px] p-[10px] bg-amber-400 my-3 rounded-lg">
      <SearchItemComponent
        icon={<ion-icon name="close-circle-outline"></ion-icon>}
        // title={"Tất cả"}
        defaultText={"Phòng trọ, nhà trọ"}
        // onClick={() => handleHideModal(categories, "category")}
      />
      <SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.province?.title}
        defaultText={"Toàn quốc"}
        // onClick={() => handleHideModal(province, "province")}
      />
      <SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.price?.title}
        defaultText={"Chọn giá"}
        // onClick={() => handleHideModal(price, "price")}
      />
      <SearchItemComponent
        icon={<ion-icon name="chevron-forward-outline"></ion-icon>}
        // title={queries?.area?.title}
        defaultText={"Chọn diện tích"}
        // onClick={() => handleHideModal(area, "area")}
      />
      <button
        // onClick={handleSearch}
        className="flex items-center justify-center text-sm font-medium fon bg-blue-custom text-white p-2 rounded-md hover:shadow-custom"
      >
        <span className="flex items-center mx-1 text-lg">
          <ion-icon name="search-outline"></ion-icon>
        </span>
        <span>Tìm kiếm</span>
      </button>
      {/* {hideModal && (
        <ModalComponent
          onSummit={handleSummit}
          content={content}
          name={name}
          setHideModal={setHideModal}
          isSelectValue={isSelectValue}
        />
      )} */}
    </div>
  );
}

export default SearchComponent;
