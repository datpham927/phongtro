import { memo, useEffect, useState } from "react";
import InputReadOnly from "../InputComponent/InputReadOnly";
import { getApiPublicDistrict, getApiPublicProvince, getApiPublicWards } from "../../services/apiAddress";
import { IDetailPost } from "../../interfaces/Post";
import InputForm from "../InputComponent/InputForm";
import SelectOption from "../SelectOption";

interface AddressComponentProps {
  payload: any; // Thay đổi kiểu dữ liệu này tùy theo cấu trúc payload của bạn
  setPayload: React.Dispatch<React.SetStateAction<any>>; // Thay đổi kiểu dữ liệu này tùy theo cấu trúc payload của bạn
  invalidFields: any; // Thay đổi kiểu dữ liệu này tùy theo cấu trúc invalidFields của bạn
  setInvalidFields: React.Dispatch<React.SetStateAction<any>>; // Thay đổi kiểu dữ liệu này tùy theo cấu trúc invalidFields của bạn
  isEdit?: boolean;
  dataEditPost?:IDetailPost
}

interface IProvince {
  code: number;
  name: string;
}

interface IDistrict {
  code: number;
  name: string;
}
interface IWard {
  code: number;
  name: string;
}
function AddressComponent({
  payload,
  setPayload,
  invalidFields,
  setInvalidFields,
  isEdit,
  dataEditPost,
}: AddressComponentProps) {
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const [provinceCode, setProvinceCode] = useState<number>();
  const [districtCode, setDistrictCode] = useState<number>();
  const [wardCode, setWardCode] = useState<number>();

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getApiPublicProvince();
      setProvinces(response);
    };
    fetchProvinces();
  }, []);


  useEffect(() => {
    if (provinceCode) {
      const fetchDistricts = async () => {
        const response = await getApiPublicDistrict(provinceCode);
        setDistricts(response.districts);
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [provinceCode]);

  
  useEffect(() => {
    if (districtCode) {
      const fetchWards = async () => {
        const response = await getApiPublicWards(districtCode);
        setWards(response.wards);
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [districtCode]);

  useEffect(() => {
    const provinceName =  provinces?.find(e => e.code === provinceCode)?.name??""
    const districtName =districts?.find(e => e.code === districtCode)?.name ??""
    const wardName = wards?.find(e => e.code === wardCode)?.name??""
    setPayload((prev:any) => ({
      ...prev,
      province: provinceName,
      district: districtName,
      ward: wardName,
    }));
  }, [provinceCode, districtCode, wardCode]);
  

  useEffect(() => {
    // if (provinces?.length > 0 && isEdit) {
    //   const arrAddress = dataEditPost?.address?.split(",");
    //   const provinceName = arrAddress?.[arrAddress?.length - 1]?.trim();
    //   const province = provinces.find(e => e.province_name === provinceName);
    //   if (province) {
    //     setProvinceCode(province.province_id);
    //   }
    // }
  }, [provinces, isEdit, dataEditPost?.address]);

  // useEffect(() => {
  //   if (districts?.length > 0 && isEdit) {
  //     const arrAddress = dataEditPost?.address?.split(",");
  //     const districtName = arrAddress?.[arrAddress?.length - 2]?.trim();
  //     const district = districts.find(e => e.district_name === districtName);
  //     if (district) {
  //       setDistrictCode(district.district_id);
  //     }
  //   }
  // }, [districts, isEdit, dataEditPost?.address]);

  // ?.find(e => e.code === provinceCode)?.name
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl my-5 font-semibold">Địa chỉ cho thuê</h1>
      <div className="flex gap-4">
        <SelectOption
          isLabel 
          valueCode={provinceCode}
          label="Tỉnh/Thành phố"
          options={provinces}
          setCode={setProvinceCode}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type="province"
        />
        <SelectOption
          isLabel
          valueCode={districtCode}
          label="Quận/Huyện"
          options={districts}
          setCode={setDistrictCode}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type="district"
        />
         <SelectOption
          isLabel
          valueCode={wardCode}
          label="Phường/Xã"
          options={wards}
          setCode={setWardCode}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type="ward"
        />
      </div>
      <InputReadOnly 
        label="Địa chỉ chính xác"
        value={`${provinceCode
          ? provinces?.find(e => e.code === provinceCode)?.name  
          : ""
        }${districtCode
          ? ", "+ districts?.find(e => e.code === districtCode)?.name  
          : ""
        }${ wardCode
          ?  ", "+ wards?.find(e => e.code === wardCode)?.name
          : ""
        }`}
      />
      <InputForm
        label={"Bản đồ"}
        value={payload?.map}
        setValue={setPayload}
        name={"map"}
        invalidFields={invalidFields}
        setInvalidFields={setInvalidFields}
      />
    </div>
  );
}

export default memo(AddressComponent);
