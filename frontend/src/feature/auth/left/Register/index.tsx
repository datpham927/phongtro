import React, { useState } from "react";
import { setFeatureAuth, setLoading, setOpenFeatureAuth } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import validate from "../../../../utils/validate";
import { apiRegister } from "../../../../services/apiAuth";
import { setIsLoginSuccess } from "../../../../redux/auth/authSlice";
import { ButtonComponent, InputComponent, InputPassWordComponent, TypeAccountComponent } from "../../../../components";

interface InvalidField {
  name: string;
  message: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const [valueForm, setValueForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password:"",
    type: "hire",
  });

  const [invalidFields, setInvalidFields] = useState<InvalidField[]>([]); 

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidFields([]);
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };
  const handelSummit = async () => {
         
        if(!validate(valueForm,setInvalidFields) ) return;
        dispatch(setLoading(true))
        const res= await apiRegister(valueForm)
        dispatch(setLoading(false))
        if(!res.status)  { alert('Email đã tồn tại'); return;}
        localStorage.setItem('access_token', JSON.stringify(res.data.authorization.access_token));
        localStorage.setItem('client_id', JSON.stringify(res.data.user_id));
        // showNotification('Đăng nhập thành công!', true);
        dispatch(setOpenFeatureAuth(false));
        dispatch(setIsLoginSuccess(true));
        window.location.reload();
  };
  return (
    <>
      <InputComponent type="text" name="name" placeholder="Nhập tên" 
        onChange={handleChangeInput}
        invalidFields={invalidFields}
      />
      <InputComponent type="text" name="email" placeholder="Nhập địa chỉ email"
        onChange={handleChangeInput}
        invalidFields={invalidFields}
      />
      <InputPassWordComponent placeholder="Nhập mật khẩu" name="password" value={valueForm?.password}
        onChange={handleChangeInput}
        invalidFields={invalidFields}
      />
       <InputPassWordComponent placeholder="Nhập xác nhận mật khẩu" name="confirm_password" value={valueForm?.confirm_password} invalidFields={invalidFields}
        onChange={handleChangeInput}
      />
      <TypeAccountComponent handleChange={handleChangeInput}/>
      <ButtonComponent className="btn-primary bg-blue-custom text-white" text="Đăng ký"
        onClick={handelSummit}
      />
      <div className="my-3 flex justify-between">
        <ButtonComponent text="Quên mật khẩu?"  className="hover:text-blue-custom"
          onClick={() =>{dispatch(setFeatureAuth(3))}} // Thêm onClick handler nếu cần
        />
        <ButtonComponent text="Đăng Nhập" className="hover:text-blue-custom"
          onClick={() =>{dispatch(setFeatureAuth(1))}} // Thêm onClick handler nếu cần
        />
      </div>
    </>
  );
};

export default Register;
