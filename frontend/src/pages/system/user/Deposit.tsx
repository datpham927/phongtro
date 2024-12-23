import React, { useState } from "react";
import { PATH } from "../../../utils/constant";
import { sortObject } from "../../../utils/sortObject";
import { calculateVnpSecureHash } from "../../../utils/calculateVnpSecureHash";
import { setCheckDeposit } from "../../../redux/action/actionSlice";
import { useDispatch } from "react-redux";
import { ENV } from "../../../utils/config/ENV";
const Deposit: React.FC = () => {
  const [amount, setAmount] = useState<any>(0);
  const dispatch=useDispatch()

  const handleVNPayPayment = () => {
    dispatch(setCheckDeposit(true))
    const numericAmount = Number(amount);
    if (!amount || numericAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ trước khi thanh toán qua VNPay.");
      return;
    }
    // Lấy thông tin cấu hình từ biến môi trường
    const vnp_TmnCode =ENV.vnp_TmnCode;
    const vnp_HashSecret = ENV.vnp_HashSecret;
    const vnp_Url = ENV.vnp_Url;
    const returnUrl = `http://localhost:5173${PATH.SYSTEM}/${PATH.DEPOSIT_CONFIRM}`;
    if (!vnp_HashSecret || !vnp_Url || !vnp_TmnCode || !returnUrl) {
      alert("Không thể thực hiện thanh toán, thiếu thông tin cấu hình.");
      return;
    }
    
    // Lấy ngày giờ hiện tại
    const createDate = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
    const orderId = new Date().getHours().toString().padStart(2, '0') + 
                    new Date().getMinutes().toString().padStart(2, '0') + 
                    Math.floor(Math.random() * 10000); // Mã giao dịch duy nhất
  
    // Dữ liệu thanh toán
    const paymentData:any = {
      vnp_Amount: numericAmount, // Chuyển đổi sang đơn vị VNPay
      vnp_Command: "pay",
      vnp_CreateDate: createDate,
      vnp_CurrCode: "VND",
      vnp_IpAddr: "127.0.0.1", // Địa chỉ IP của người dùng
      vnp_Locale: "vn", // Ngôn ngữ mặc định
      vnp_OrderInfo: `p`,
      vnp_OrderType: "250000",
      vnp_ReturnUrl: returnUrl,
      vnp_TxnRef: orderId, // Mã tham chiếu giao dịch
      vnp_Version: "2.1.0",
      vnp_TmnCode: vnp_TmnCode,
    }; 
    // Sắp xếp các tham số theo thứ tự alphabet
    const sortedParams:any = sortObject(paymentData)
      .map((key) => `${key}=${encodeURIComponent(paymentData[key])}`)
      .join("&");
    // Tạo HMAC SHA512
    const vnp_SecureHash = calculateVnpSecureHash(sortedParams, vnp_HashSecret ) ;
    // Tạo URL thanh toán
    const paymentUrl = `${vnp_Url}?${sortedParams}&vnp_SecureHash=${vnp_SecureHash}`;
    // Điều hướng người dùng đến VNPay
    alert(`Thanh toán qua VNPay với số tiền: ${numericAmount} VND`); 
    window.location.href = paymentUrl;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white py-8 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
          Nạp Tiền
        </h1>

        {/* Input số tiền */}
        <div className="mb-8">
          <label
            htmlFor="amount"
            className="block text-gray-600 font-medium mb-2 text-sm"
          >
            Nhập số tiền cần nạp (VND):
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-gray-700 text-lg"
            placeholder="Nhập số tiền..."
          />
        </div>

        {/* Các lựa chọn nhanh */}
        <div className="mb-8">
          <p className="text-gray-600 font-medium mb-3 text-sm">
            Hoặc chọn nhanh số tiền:
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[100000, 200000, 500000, 1000000].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value.toString())}
                className="bg-blue-100 text-blue-800 font-medium py-3 rounded-full hover:bg-blue-200 transition shadow-sm text-sm"
              >
                {value.toLocaleString()} VND
              </button>
            ))}
          </div>
        </div>

        {/* Nút nạp tiền qua VNPay */}
        <button
          onClick={handleVNPayPayment}
          className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-full hover:opacity-90 transition shadow-lg text-lg"
        >
          <img
            src='https://pay.vnpay.vn/images/brands/logo-en.svg'
            alt="VNPay Logo"
            className="h-6 w-auto mr-2"
          />
          Thanh toán qua VNPay
        </button>
      </div>
    </div>
  );
};

export default Deposit;

 