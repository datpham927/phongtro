import { useEffect, useState, useCallback } from "react";
import { AddressComponent, ButtonComponent, NoticeListComponent, OverviewComponent } from "../../../components";
import validate from "../../../utils/validate";
import { apiUpdatePost, getDetailPost } from "../../../services/apiPost";
import { IDetailPost, IPostPayload } from "../../../interfaces/Post";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { convertToSlug } from "../../../utils/format/convertToSlug"; 
import { convertMillionToDecimal } from "../../../utils/format/convertMillionToDecimal";
import {  useParams } from "react-router-dom";
import { setLoading } from "../../../redux/action/actionSlice"; 
import MapComponent from "../../../components/MapComponent";

function UpdatePost() {
  const [payload, setPayload] = useState<IPostPayload>({
    areaNumber: "",
    categoryCode: "",
    description: "",
    images: [], 
    priceNumber: "",
    province: "",
    district: "",
    ward: "",
    target: "Tất cả",
    title: "",
    address_detail:''
  });
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const { categories } = useAppSelector((state) => state.category);
  const { pid: postId } = useParams<{ pid: string }>();
  const dispatch= useAppDispatch() 
  // Tối ưu useEffect để chỉ gọi khi postId thay đổi
  useEffect(() => {
    const fetchApi = async () => {
      if (!postId) return;
      dispatch(setLoading(true)) 
      const res = await getDetailPost(postId);
      dispatch(setLoading(false))
      if (res?.status) {
        const post: IDetailPost = res.data;
        const { address, area,   category,  price, images, user,...data } = post;
        setPayload({
          province: address.city_name,
          district: address.district_name,
          ward: address.ward_name, 
          areaNumber: area.number,
          priceNumber: price.number,
          categoryCode: category.id,
          images: images.map((e: any) => e.url),
          ...data,
        });
      }else{
        alert("Cập nhật không thành công")
      }
    };
    fetchApi();
  }, [postId]);

  // Memo hóa hàm handleSummit để tránh tạo mới khi re-render
  const handleSummit = useCallback(async () => {
    dispatch(setLoading(true)) 
    const check = validate(payload, setInvalidFields);
    if (!check) return; 
    const { areaNumber, priceNumber, images, categoryCode, district, province, ward, target, ...data } = payload;
    const postData = {
      thumb: images[0],
      images,
      price: { order: priceNumber, value: `${convertMillionToDecimal(Number(priceNumber))} đồng/tháng` },
      area: { order: areaNumber, value: `${areaNumber} m2` },
      category_id: categoryCode,
      attribute: {
        target,
        post_type: categories?.find((e) => e.id === categoryCode)?.name 
      },
      address: {
        city_name: convertToSlug(province),
        district_name: convertToSlug(district),
        ward_name: convertToSlug(ward),
        address_detail: `${province}, ${district}, ${ward}`,
      },
      ...data,
    }; 
    const response = await apiUpdatePost(postId!, postData); // `postId` có thể undefined, cần đảm bảo kiểu
    dispatch(setLoading(false))  
    if(response.status) { alert('Cập nhật thành công')}
    else{ alert('Cập nhật không thành công')}
  }, [payload, categories, postId]);

  return (
    <div className="h-full px-7 flex flex-col">
      <div className="w-full border-gray-300">
        <h1 className="text-4xl py-3">Cập nhật bài viết</h1>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-3 w-[60%] pb-20">
          <AddressComponent
            isEdit
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
            text="Cập nhật"
            className="bg-blue-custom text-white"
            onClick={handleSummit}
          />
        </div>
        <div className="flex flex-col gap-3 w-[40%] pb-20 items-center">
        <MapComponent width="80%" height="300px" placeName={payload?.address_detail}/>  
          <NoticeListComponent />
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
