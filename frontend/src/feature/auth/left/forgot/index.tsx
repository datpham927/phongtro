import React, { useState } from 'react';
import { sendMailForgot } from '../../../../services/apiAuth';
import validate from '../../../../utils/validate';
interface InvalidField {
    name: string;
    message: string;
  }
  
const Forgot: React.FC = () => {
     const [email,setEmail]=useState<string>('')
     const [invalidFields, setInvalidFields] = useState<InvalidField[]>([]); 

     const handleForgetPassword = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!validate({'email':email},setInvalidFields)){ return;}
        const res = await sendMailForgot(email);
        if (!res.status) { alert("Gửi email không thành công"); return; }
        alert('Vui lòng kiểm tra email của bạn');
    }
    
    return (
        < >
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Quên mật khẩu</h1>
                <p className="text-base">Vui lòng nhập địa chỉ gmail</p>
            </div>
            <form className="flex flex-col ">
                <div className="border-b-[1px]  py-2">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        className="w-full text-lg outline-none border-none "
                        placeholder="dpshopvn@gmail.com"
                    />
                </div>
                {invalidFields.length>0&& <p className="text-red-400 text-sm">{invalidFields.find(e=>e.name=='email')?.message}</p>}
                <div className="flex flex-col gap-2 mt-6">
                    <button
                        className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                        onClick={handleForgetPassword}
                    >
                        Tiếp tục
                    </button>
                </div>
            </form>
        </>
    );
};

export default Forgot;
