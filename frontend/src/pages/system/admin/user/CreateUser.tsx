import { useCallback, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import {  ButtonComponent } from "../../../../components";
import { ICreateIUser  } from "../../../../interfaces/User";
import InputForm from "../../../../components/InputComponent/InputForm";
import { setLoading } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { apiCreateUser  } from "../../../../services/apiUser";
import validate from "../../../../utils/validate";
import { apiUploadImage } from "../../../../services/apiUploadPicture";
import { FormControl, FormControlLabel,  Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../utils/constant";

function CreateUser() {
  const [payload, setPayload] = useState<ICreateIUser>({
    avatar: '',
    email: '',
    facebook: '',
    name: '',
    phone: '',
    type: 'admin',
    zalo: '',
    password:'',
    confirm_password:'',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState<any>([]);
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
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
  const handleSubmit = async() => {
    dispatch(setLoading(true)); 
    if (validate(payload, setInvalidFields)) {
      const {id,confirm_password,...data }=payload
      const res = await apiCreateUser(data);
      if (!res.status) {
         alert("Thêm không thành công");
      }else{
        navigate(`${PATH.SYSTEM}/${PATH.MANAGE_USER}`)
      }
      dispatch(setLoading(false)); 
    }
  } ;

  return (
    <div className="flex flex-col h-full px-7 ">
      <div className="w-full border-solid border-b-[1px] border-gray-300">
        <h1 className="text-4xl py-3">Thêm người dùng</h1>
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
                    defaultValue="admin" // Mặc định chọn "admin"
                    name="role-radio-group"
                    onChange={(e)=>  setPayload((prev:any)=> ({...prev,type:e.target.value}))} 
                  >
                    <FormControlLabel 
                      value="admin" 
                      control={<Radio />} 
                      label="Quản trị viên" 
                      sx={{ '& .MuiTypography-root': { fontSize: '14px' } }} // Sửa lại fontSize cho label
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
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name="password"
            type="password"
            direction="flex-row"
            label="Mật khẩu"
            value={payload?.password}
            setValue={setPayload}
          />
            <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            type="password"
            name="confirm_password"
            direction="flex-row"
            label="Xác nhận mật khẩu"
            value={payload?.confirm_password}
            setValue={setPayload}
          />
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
            text="Thêm"
            className="bg-blue-custom cursor-pointer text-white hover:bg-blue-700 mb-20 w-1/2 mx-auto"
            onClick={handleSubmit}
          />
        </div>
    </div>
  );
}

export default CreateUser;
