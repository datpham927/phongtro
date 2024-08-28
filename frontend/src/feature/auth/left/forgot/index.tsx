import React from 'react';

const Forgot: React.FC = () => {
     
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
                        // value={emailValue}
                        // onChange={(e) => setEmailValue(e.target.value)}
                        className="w-full text-lg outline-none border-none "
                        placeholder="dpshopvn@gmail.com"
                    />
                </div>
                {/* {error && <p className="text-red-400 text-sm">{error}</p>} */}
                <div className="flex flex-col gap-2 mt-6">
                    <button
                        className="w-full bg-pink-500 py-2 rounded-sm text-white text-xl font-normal hover:opacity-80  transition duration-200 "
                        // onClick={handleForgetPassword}
                    >
                        Tiếp tục
                    </button>
                </div>
            </form>
        </>
    );
};

export default Forgot;
