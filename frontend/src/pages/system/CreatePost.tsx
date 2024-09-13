import { useState } from "react";
import { AddressComponent, ButtonComponent, NoticeListComponent, OverviewComponent } from "../../components";
import validate from "../../utils/validate";
import { apiCreatePost } from "../../services/apiPost";
import { IDetailPost, IPost } from "../../interfaces/Post";
import { useAppSelector } from "../../redux/hooks";
import { convertToSlug } from "../../utils/format/convertToSlug";
import { getOneYearLater } from "../../utils/getOneYearLater";
import { convertMillionToDecimal } from "../../utils/format/convertMillionToDecimal";
import { isArrayBuffer } from "util/types";
interface Payload {
  areaNumber: string;
  categoryCode: string;
  description: string;
  images: string[];
  map: string;
  priceNumber: string;
  province: string;
  target: string;
  title: string;
  district:string,
  ward:string,
}

function CreatePost() {
  const [payload, setPayload] = useState<Payload>({
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
    title: ""
  });
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const { categories } = useAppSelector((state) => state.category);
  const handleSummit = async () => {
    const check = validate(payload, setInvalidFields);
    console.log(invalidFields)
    if (!check) return;
  
    const { areaNumber, priceNumber, images, categoryCode, district, province, ward, map, target, ...data } = payload;
    console.log(Array.isArray(images)); 
    const postData = {
      thumb: images[0],
      images,
      price: { order: priceNumber, value: `${convertMillionToDecimal(Number(priceNumber))} đồng/tháng` },
      area: { order: areaNumber, value: `${areaNumber} m2` },
      category_id: categoryCode,
      attribute: {
        target,
        type_post: categories.find(e => e.id === categoryCode)?.name,
        expire: getOneYearLater(),
      },
      address: {
        city_name: convertToSlug(province),
        district_name: convertToSlug(district),
        ward_name: convertToSlug(ward),
        address_detail: `${province}, ${district}, ${ward}`,
        map,
      },
      ...data,
    };
    const response = await apiCreatePost(postData);
    console.log(response);
  };

  return (       
    <div className="h-full px-7 flex flex-col">
      <div className="  w-full border-solid border-b-[1px] border-gray-300">
        <h1 className=" text-4xl py-3  ">
             Đăng tin mới
        </h1>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-3 w-[60%] pb-20">
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

       <ButtonComponent
        text={"Tạo mới"}
        className={"bg-blue-custom text-white"}
        onClick={handleSummit}
      />
        </div >

         <div className="flex flex-col gap-3 w-[40%] pb-20">
           <NoticeListComponent/>
         </div>
      </div>
    </div>
  );
}

export default CreatePost;
