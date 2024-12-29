import { memo, useEffect, useState } from "react";
import InputReadOnly from "../InputComponent/InputReadOnly";
import { getApiPublicDistrict, getApiPublicProvince, getApiPublicWards } from "../../services/apiAddress";
import { IPostPayload } from "../../interfaces/Post";
import SelectOption from "../SelectOption";

interface AddressComponentProps {
  payload: IPostPayload;
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  invalidFields: any;
  setInvalidFields: React.Dispatch<React.SetStateAction<any>>;
  isEdit?: boolean;
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
}: AddressComponentProps) {
  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const [provinceCode, setProvinceCode] = useState<number | any>(undefined);
  const [districtCode, setDistrictCode] = useState<number | any>(undefined);
  const [wardCode, setWardCode] = useState<number | any>(undefined);

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getApiPublicProvince();
      setProvinces(response);
     
    };
    fetchProvinces();
  }, []);

  // Fetch districts when provinceCode changes
  useEffect(() => {
    if (provinceCode) {
      const fetchDistricts = async () => {
        const response = await getApiPublicDistrict(provinceCode);
        setDistricts(response.districts); 
      };
      fetchDistricts();
      setDistrictCode('')
      setWardCode('')
    }  
  }, [provinceCode]);

  // Fetch wards when districtCode changes
  useEffect(() => {
    if (districtCode) {
      const fetchWards = async () => {
        const response = await getApiPublicWards(districtCode);
        setWards(response.wards);
      };
      fetchWards();
      setWards([]); // Clear wards when no district is selected
      setWardCode('')
    } 
  }, [districtCode]);

  // Update address_detail whenever provinces, districts, or wards change
  useEffect(() => {
    const provinceName = provinces?.find((e) => e.code === provinceCode)?.name ?? "";
    const districtName = districts?.find((e) => e.code === districtCode)?.name ?? "";
    const wardName = wards?.find((e) => e.code === wardCode)?.name ?? "";
    const fullAddress = `${wardCode ? wardName + ", " : ""}${districtCode ? districtName + ", " : ""}${provinceCode ? provinceName : ""}`;
    // Update payload with new address details
    setPayload((prev: any) => ({
      ...prev,
      province: provinceName,
      district: districtName,
      ward: wardName,
      address_detail: fullAddress,
    }));
  }, [provinces, districts, wards, provinceCode, districtCode, wardCode, setPayload]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl my-5 font-semibold">Địa chỉ cho thuê</h1>
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
      <InputReadOnly label="Địa chỉ chính xác" value={payload.address_detail} />
    </div>
  );
}

export default memo(AddressComponent);
