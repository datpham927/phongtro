import { useCallback, useState } from "react";
import { AddressComponent, ButtonComponent, NoticeListComponent, OverviewComponent, PostPackageComponent } from "../../../components";
import validate from "../../../utils/validate";
import { apiCreatePost } from "../../../services/apiPost";
import {  IPostPayload } from "../../../interfaces/Post";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { convertToSlug } from "../../../utils/format/convertToSlug";
import { getOneYearLater } from "../../../utils/getOneYearLater";
import { convertMillionToDecimal } from "../../../utils/format/convertMillionToDecimal";
import { PATH } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/action/actionSlice";
import { IPostType } from "../../../interfaces/PostType";

function CreatePost() {
  const [payload, setPayload] = useState<IPostPayload>({
    areaNumber: "",
    categoryCode: "",
    description: "",
    images: [],
    map: "",
    priceNumber: "",
    province: "",
    district:'',
    ward:'',
    target: "Tất cả",
    title: "",
    address_detail:''
  });
  const [invalidFields, setInvalidFields] = useState<any>([]); 
  const [postType, setPostType] = useState<IPostType>(); 
  const  user   = useAppSelector((state) => state.user);

  const dispatch= useAppDispatch()
  const navigate=useNavigate()

  const handleSummit = useCallback(async () => {

    const check = validate(payload, setInvalidFields);
    if (!check) return;
    dispatch(setLoading(true))
    const { areaNumber, priceNumber, images,categoryCode, district, province, ward,...data } = payload;
    const postData = {
      thumb: images[0],
      images,
      expire_at:getOneYearLater(),
      price: { number: priceNumber, value: `${convertMillionToDecimal(Number(priceNumber))} triệu/tháng` },
      area: { number: areaNumber, value: `${areaNumber} m2` },
      category_id: categoryCode,
      post_type_id:postType?.id,
      address: {
        city_name: convertToSlug(province),
        district_name: convertToSlug(district),
        ward_name: convertToSlug(ward),
      },
      ...data,
    };
    const response = await apiCreatePost(postData);
    dispatch(setLoading(false)) 
    if(response.status) {alert("Thêm thành công");navigate(`${PATH.SYSTEM}/${PATH.MANAGE_POST}`)}
    else{ alert('Thêm không thành công')}
  },[payload]);

  return (       
    <div className="h-full px-7 flex flex-col">
      <div className="  w-full bnumber-solid bnumber-b-[1px] bnumber-gray-300">
        <h1 className=" text-4xl py-3  ">
             Đăng tin mới
        </h1>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-3 w-[60%] pb-20">
          <PostPackageComponent  setPostType={setPostType} postType={postType}/>
          <AddressComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <OverviewComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            /> 

{postType&&   <ButtonComponent
        text={`${postType?.price > 0 ? `Thanh toán ${new Intl.NumberFormat('vi-VN').format(postType?.price)}₫` : "Miễn phí"}`}
        className={ `${postType?.price>user?.account_balance ?"opacity-80":"hover:bg-[#D61117]"} bg-[#E51F40] text-white text-sm`}
        onClick={()=> postType&&handleSummit()}

      />}
        </div >
         <div className="flex flex-col gap-3 w-[40%] pb-20">
           <NoticeListComponent/>
         </div>
      </div>
    </div>
  );
}

export default CreatePost;
