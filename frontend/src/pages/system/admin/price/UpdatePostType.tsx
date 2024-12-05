import {  ButtonComponent } from "../../../../components";
import InputForm from "../../../../components/InputComponent/InputForm";
import { setLoading } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import validate from "../../../../utils/validate";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../../utils/constant";
import { useEffect, useState } from "react";
import {  apiGetCategory, apiUpdateCategory } from "../../../../services/apiCategory";

function UpdatePostType() {
  const [payload, setPayload] = useState<any>({
    name:"",
    sub_title:"",
    title:"",
  });
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const { cid } = useParams<{ cid: string }>();

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!cid) return;
      dispatch(setLoading(true));
      const res = await apiGetCategory(cid);
      if (res?.status) {
        setPayload(res.data);
      }
      dispatch(setLoading(false));
    };
    fetchUserDetail();
  }, [cid]);

  const handleSubmit = async() => {
    dispatch(setLoading(true)); 
    if (validate(payload, setInvalidFields)) {
      const {id,confirm_password,...data }=payload
      const res = await apiUpdateCategory(data,cid);
      if (!res.status) {
         alert("Cập nhật không thành công");
      }else{
        navigate(`${PATH.SYSTEM}/${PATH.MANAGE_CATEGORY}`)
      }
    }
    dispatch(setLoading(false)); 
  } ;
  return (
    <div className="flex flex-col h-full px-7 ">
      <div className="w-full border-solid border-b-[1px] border-gray-300">
        <h1 className="text-4xl py-3">Cập nhật danh mục</h1>
      </div>
        <div className="flex w-full gap-4 flex-col  ">
          <div className="flex flex-col gap-4 my-5">
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="name"
            direction="flex-row"
            label="Tên danh mục"
            value={payload?.name}
            setValue={setPayload}
          /> 
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="title"
            direction="flex-row"
            label="Tiêu đề"
            value={payload?.title}
            setValue={setPayload}
          /> 
          <div className="flex ">
           <label htmlFor="sub_title " className="w-1/2">Tiêu đề mô tả</label>
        <div className="w-full">
        <textarea 
              value={payload?.sub_title}
              onChange={(e) => {
                setPayload((prev:any) => ({ ...prev, sub_title: e?.target?.value }));
                setInvalidFields(
                  invalidFields?.filter((e:any) => e.name !== "sub_title")
                );
              }}
              id="sub_title"
              rows={10}
              className="border-solid w-full border-[1px] border-slate-300  outline-blue-300 rounded-md p-2"
              />
              {invalidFields?.some((e:any) => e.name === "sub_title") ? (
              <span className="text-red-500 text-sm">
                {invalidFields?.find((e:any) => e.name === "sub_title")?.message}
              </span>
              ) : (
              ""
              )}
        </div>
      </div>
          <ButtonComponent
            text="Cập nhật"
            className="bg-blue-custom cursor-pointer text-white hover:bg-blue-700 mb-20 w-1/2 mx-auto"
            onClick={handleSubmit}
          />
        </div>
    </div>
  );
}

export default UpdatePostType;
