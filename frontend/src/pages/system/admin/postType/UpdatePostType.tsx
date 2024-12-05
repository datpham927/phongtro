import {  ButtonComponent } from "../../../../components";
import InputForm from "../../../../components/InputComponent/InputForm";
import { setLoading } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import validate from "../../../../utils/validate";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../../utils/constant";
import { useEffect, useState } from "react";
import { apiGetPostType, apiUpdatePostType } from "../../../../services/apiPosType";
import { IPostType } from "../../../../interfaces/PostType";
import InputReadOnly from "../../../../components/InputComponent/InputReadOnly";
import { Editor } from '@tinymce/tinymce-react';
function UpdatePostType() {
  const [payload, setPayload] = useState<IPostType>({
    price:"",
    name:"",
    id:"",
    expiration_time:0,
    description:"",
  });
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const { ptypeid } = useParams<{ ptypeid: string }>();
  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!ptypeid) return;
      dispatch(setLoading(true));
      const res = await apiGetPostType(ptypeid);
      if (res?.status) {
        setPayload(res.data);
      }
      dispatch(setLoading(false));
    };
    fetchUserDetail();
  }, [ptypeid]);
  const handleSubmit = async() => {
    dispatch(setLoading(true)); 
    if (validate(payload, setInvalidFields)) {
      const {id,...data }=payload 
      const res = await apiUpdatePostType(id , data);
      if (!res.status) {
         alert("Cập nhật không thành công");
      }else{
        navigate(`${PATH.SYSTEM}/${PATH.MANAGE_POST_TYPE_LIST}`)
      }
    }
    dispatch(setLoading(false)); 
  } ;
  return (
    <div className="flex flex-col h-full px-7 ">
      <div className="w-full border-solid border-b-[1px] border-gray-300">
        <h1 className="text-4xl py-3">Cập nhật loại bài viết</h1>
      </div>
        <div className="flex w-full gap-4 flex-col  ">
          <div className="flex flex-col gap-4 my-5">
          <InputReadOnly
            direction="flex-row"
            label="Tên dịch vụ"
            value={payload?.name}
          /> 
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="price"
            direction="flex-row"
            label="Giá"
            type="number"
            value={payload?.price}
            setValue={setPayload}
          /> 
            <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="expiration_time"
            direction="flex-row"
            label="Thời hạn (tháng)"
            type="number"
            value={payload?.expiration_time}
            setValue={setPayload}
          /> 
          <div className="flex ">
           <label htmlFor="sub_title " className="w-1/2">Tiêu đề mô tả</label>
        <div className="w-full">
        <Editor
            apiKey='rzmmn507jrrjqhb3a93rj7iuzc7m2r1c00tqws0bur4ihi1k'
            init={{
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            initialValue={payload.description}
            onEditorChange={(content) => setPayload((prev) => ({ ...prev, description: content }))}
          />
          {invalidFields.some((e:any) => e.name === "description") && (
            <span className="text-red-500 text-sm">
              {invalidFields.find((item:any) => item.name === "description")?.message}
            </span>
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
