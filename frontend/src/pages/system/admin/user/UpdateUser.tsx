import { useCallback, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import {   ButtonComponent } from "../../../../components";
import { IUserDetail } from "../../../../interfaces/User";
import InputForm from "../../../../components/InputComponent/InputForm";
import { setLoading } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import {   useParams } from "react-router-dom";
import { apiGetDetailUser,  apiUpdateUser } from "../../../../services/apiUser";
import validate from "../../../../utils/validate";
import { apiUploadImage } from "../../../../services/apiUploadPicture";
import { FormControl, FormControlLabel,  Radio, RadioGroup } from "@mui/material";

function UpdateUser() {
  const [payload, setPayload] = useState<IUserDetail>({
    id: '',
    avatar: '',
    email: '',
    facebook: '',
    name: '',
    phone: '',
    type: '',
    zalo: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const { uid } = useParams<{ uid: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!uid) return;
      dispatch(setLoading(true));
      const res = await apiGetDetailUser(uid);
      if (res?.status) {
        setPayload(res.data);
      }
      dispatch(setLoading(false));
    };
    fetchUserDetail();
  }, [uid]);

  const handleUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_REACT_UPLOAD_PRESET);
      
      const response = await apiUploadImage(formData);
      if (response) {
        setPayload(prev => ({ ...prev, avatar: response.url }));
      }
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    dispatch(setLoading(true));
    if (validate(payload, setInvalidFields)) {
      const {id,...data}=payload
      const response = await apiUpdateUser(data, uid);
      if (!response.status) {
        alert("Cập nhật không thành công");
        dispatch(setLoading(false));
        return;
      }
      alert("Cập nhật thành công");
    }
    dispatch(setLoading(false));
  }, [payload, uid]);

  return (
    <div className="flex flex-col h-full px-7 ">
      <div className="w-full border-solid border-b-[1px] border-gray-300">
        <h1 className="text-4xl py-3">Cập nhật thông tin người dùng</h1>
      </div>
        <div className="flex w-full gap-4 flex-col  ">
          <div className="flex flex-col gap-4 my-5">
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="phone"
            direction="flex-row"
            label="Số điện thoại"
            value={payload?.phone}
            setValue={setPayload}
          /> 
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="email"
            direction="flex-row"
            label="Email"
            value={payload?.email}
            setValue={setPayload}
          /> 
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="name"
            direction="flex-row"
            label="Tên hiển thị"
            value={payload?.name}
            setValue={setPayload}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="zalo"
            direction="flex-row"
            label="Số Zalo"
            value={payload?.zalo}
            setValue={setPayload}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="facebook"
            direction="flex-row"
            label="Facebook"
            value={payload?.facebook}
            setValue={setPayload}
          />
          <div className="flex items-start">
              <h1 className="flex items-end w-1/3">Vai trò</h1>
              <FormControl>
          <RadioGroup
            aria-labelledby="role-radio-group-label" 
            name="role-radio-group"
            value={payload.type}  // Make the RadioGroup controlled
            onChange={(e) => setPayload((prev:any) => ({ ...prev, type: e.target.value }))}
          >
            <FormControlLabel 
              value="admin" 
              control={<Radio />} 
              label="Quản trị viên" 
              sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} // Custom fontSize for label
            />
            <FormControlLabel 
              value="lease" 
              control={<Radio />} 
              label="Người cho thuê" 
              sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} 
            />
            <FormControlLabel 
              value="hire" 
              control={<Radio />} 
              label="Người thuê" 
              sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} 
            />
          </RadioGroup>
        </FormControl>

          </div>

          <div className="flex my-5">
            <label className="w-1/3">Mật khẩu</label>
            <button className="text-sm text-blue-custom">Đổi mật khẩu</button>
          </div>
          <div className="flex my-5">
            <label className="w-1/3">Ảnh đại diện</label>
            <div className="flex flex-col text-center gap-4">
              <img
                className="w-[140px] h-[140px] rounded-full shadow-custom"
                src={payload?.avatar || "https://phongtro123.com/images/default-user.png"}
              />
              <input
                type="file"
                id="avatar"
                hidden
                onChange={handleUploadImage}
              />
              <label
                htmlFor="avatar"
                className="flex justify-center px-2 py-1 bg-slate-200 rounded-md"
              >
                {isLoading ? (
                  <BallTriangle
                    height={20}
                    width={20}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    visible={true}
                  />
                ) : (
                  <>Chọn ảnh</>
                )}
              </label>
            </div>
          </div>
          <ButtonComponent
            text="Lưu & Cập nhật"
            className="bg-blue-custom cursor-pointer text-white hover:bg-blue-700 mb-20 w-1/2 mx-auto"
            onClick={handleSubmit}
          />
        </div>
    </div>
  );
}

export default UpdateUser;
