import React, { useState } from "react";

const Deposit: React.FC = () => {
  const [amount, setAmount] = useState<string>("");

  const handleVNPayPayment = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ trước khi thanh toán qua VNPay.");
      return;
    }
    alert(`Thanh toán qua VNPay với số tiền: ${amount} VND`);
    // Tích hợp VNPay API tại đây
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
