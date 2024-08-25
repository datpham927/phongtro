import React, { useState } from "react";
import ButtonComponent from "../../../../components/ButtonComponent/ButtonComponent";
import InputComponent from "../../../../components/InputComponent/InputComponent";
import { setFeatureAuth } from "../../../../redux/action/actionSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import InputPassWordComponent from "../../../../components/InputComponent/InputPassWordComponent";

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
    type: "",
  });

  const [invalidFields, setInvalidFields] = useState<InvalidField[]>([]); 

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidFields([]);
    setValueForm({ ...valueForm, [e.target.name]: e.target.value });
  };

  const handelSummit = () => {
    // Xử lý logic submit form ở đây
  };

  return (
    <>
      <InputComponent
        type="text"
        name="name"
        placeholder="Nhập tên"
        onChange={handleChangeInput}
        invalidFields={invalidFields}
      />
      <InputComponent
        type="text"
        name="email"
        placeholder="Nhập địa chỉ email"
        onChange={handleChangeInput}
        invalidFields={invalidFields}
      />
      <InputPassWordComponent
        placeholder="Nhập mật khẩu"
        onChange={handleChangeInput}
        invalidFields={invalidFields}
        name="password"
      />
      <ButtonComponent
        className="btn-primary bg-blue-custom text-white"
        text="Đăng ký"
        onClick={handelSummit}
      />
      <div className="my-3 flex justify-between">
        <ButtonComponent
          text="Quên mật khẩu?"
          className="hover:text-blue-custom"
          onClick={() =>   {dispatch(setFeatureAuth(3))}} // Thêm onClick handler nếu cần
        />
        <ButtonComponent
          text="Đăng Nhập"
          className="hover:text-blue-custom"
          onClick={() =>  {dispatch(setFeatureAuth(2))}} // Thêm onClick handler nếu cần
        />
      </div>
    </>
  );
};

export default Register;
