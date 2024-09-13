import {  useState, ChangeEvent  } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import InputForm from "../InputComponent/InputForm";
import InputFormV2 from "../InputComponent/InputFormV2";
import InputReadOnly from "../InputComponent/InputReadOnly";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SelectOption from "../SelectOption";
import { apiUploadImage } from "../../services/apiUploadPicture";

interface OverviewComponentProps {
  payload: any;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  invalidFields: { name: string; message: string }[];
  setInvalidFields: React.Dispatch<React.SetStateAction<{ name: string; message: string }[]|any>>;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

function OverviewComponent({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit = false,
  setIsEdit,
}: OverviewComponentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [images, setImage] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useAppSelector((state: RootState) => state.category);
  const  user  = useAppSelector((state) => state.user);

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files;
    if (!files) return;
    let imagesArray: string[] = [];
    const formData = new FormData();
  
    for (let i of Array.from(files)) {
      formData.append("file", i);
      formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
      const response = await apiUploadImage(formData);
      if (response) {
        imagesArray = [...imagesArray, response.secure_url];
      }
    }
  
    setIsLoading(false);
  
    // Ensure payload?.images is an array, and if not, initialize it as an empty array
    setPayload((prev: any) => ({
      ...prev,
      images: [...(prev?.images ?? []), ...imagesArray],
    }));
    setImage((image) => (image && image?.length > 0 ? [...image, ...imagesArray] : [...imagesArray]));
  };
  

  // useEffect(() => {
  //   if (dataEditPost?.images?.image && isEdit) {
  //     setImage(JSON.parse(dataEditPost?.images?.image));
  //   }
  // }, [dataEditPost, isEdit]);


  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="text-2xl mt-6 font-semibold">Thông tin mô tả</h1>
      <SelectOption
        isLabel
        label={"Loại chuyên mục"}
        options={categories}
        type={"categoryCode"}
        setValue={setPayload}
        valueCode={payload?.categoryCode}
      />
      <InputForm
        label={"Tiêu đề"}
        value={payload?.title}
        setValue={setPayload}
        name={"title"}
        
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
      />
      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Nội dung mô tả</label>
        <textarea
          value={payload?.description}
          onChange={(e) => {
            setPayload((prev:any) => ({ ...prev, description: e?.target?.value }));
            setInvalidFields(
              invalidFields?.filter((e) => e.name !== "description")
            );
          }}
          id="desc"
          rows={10}
          className="border-solid border-[1px] border-slate-300 w-full outline-blue-300 rounded-md p-2"
        />
        {invalidFields?.some((e) => e.name === "description") ? (
          <span className="text-red-500 text-sm">
            {invalidFields?.find((e) => e.name === "description")?.message}
          </span>
        ) : (
          ""
        )}
      </div>
        <InputReadOnly
          label={"Thông tin liên hệ"}
          value={user?.name}
          className='w-1/2'
        />
        <InputReadOnly
          label={"Điện thoại"}
          value={user?.phone}
            className='w-1/2'
        />
      <InputFormV2
        label={"Giá cho thuê"}
        unit={"đồng/tháng"}
        setValue={setPayload}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        name={"priceNumber"}
        value={payload?.priceNumber}
      />
      <InputFormV2
        label={"Diện tích"}
        unit={"m2"}
        setValue={setPayload}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
        name={"areaNumber"}
        value={payload?.areaNumber}
      />
      <SelectOption
        setValue={setPayload}
        valueCode={payload?.target}
        isLabel
        label={"Đối tượng cho thuê"}
        type="target"
        options={[
          {
            code: 1,
            name: "Nam",
          },
          {
            code: 2,
            name: "Nữ",
          },
        ]}
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Hình ảnh</h1>
        <span className="text-sm">
          Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
        </span>
        <div className="w-full">
          <label
            htmlFor="upload-image"
            className="text-xl flex flex-col items-center justify-center py-4  border-[2px] border-dashed border-[#bbb]"
          >
            {isLoading ? (
              <BallTriangle
                height={90}
                width={90}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                visible={true}
              />
            ) : (
              <img
                className="w-[90px] "
                src="https://phongtro123.com/dashboard_resource/images/upload-image.png"
                alt=""
              />
            )}
            Thêm ảnh
          </label>
          <input
            hidden
            id="upload-image"
            type="file"
            onChange={handleUploadImage}
            multiple
          />
        </div>
        {invalidFields?.length > 0 &&
        invalidFields.some((e:any) => e.name === "images") && (
          <span className="my-1 text-sm text-red-custom">
            {invalidFields.find((e:any) => e.name === "images")?.message}
          </span>
        )}
      </div> 
      <div className="grid grid-cols-4 gap-3">
        {images?.map((e) => (
          <div className="flex flex-col justify-center shadow-custom rounded-md overflow-hidden">
            <img className="w-full h-[110px] object-cover " src={e} alt="" />
            <div
              className="w-full bg-white flex items-center justify-center py-2 cursor-pointer"
              onClick={() => setImage(() => images?.filter((i) => i !== e))}
            >
              <span className="text-sm">Xóa</span>
            </div>
          </div>
        ))}
      </div>
    
   
    </div>
  );
}

export default  OverviewComponent 
