import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { setLoading } from "../../../redux/action/actionSlice";
import { sortObject } from "../../../utils/sortObject";
import { calculateVnpSecureHash } from "../../../utils/calculateVnpSecureHash";
import { PATH } from "../../../utils/constant";
import { apiDeposit } from "../../../services/apiUser";
import { useAppDispatch } from "../../../redux/hooks";

// Định nghĩa kiểu cho các tham số query
interface VnpParams {
  [key: string]: string | undefined;
}

const DepositSuccess: React.FC = () => {
  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // New state to track processing
  const navigate = useNavigate();
  const location = useLocation();
  const queries = queryString.parse(location.search) as VnpParams;
  const vnp_HashSecret = import.meta.env.VITE_REACT_vnp_HashSecret || '';
  const dispatch=useAppDispatch();
  const verifyPayment = async () => {
    const { vnp_SecureHash, ...vnp_Params } = queries;
    const sortedParams = sortObject(vnp_Params)
      .map((key: string) => `${key}=${encodeURIComponent(vnp_Params[key] as string)}`)
      .join("&");
    const signed = calculateVnpSecureHash(sortedParams, vnp_HashSecret);
    if (vnp_SecureHash === signed) {
      const { vnp_Amount, vnp_TransactionStatus } = vnp_Params;
      setLoading(true);
      setIsProcessing(true); // Set to processing state
      if (vnp_TransactionStatus !== "00") {
        const res = await apiDeposit(Number(vnp_Amount));
        setPaymentStatus(res.status);
        setIsProcessing(false); // Stop processing after API response
      } else {
        setPaymentStatus(false);
        setIsProcessing(false);
      }
    } else {
      setPaymentStatus(false);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (queries.vnp_SecureHash) {
      verifyPayment();
    }
  }, [vnp_HashSecret]);

  const handleVNPayPaymentConfirm = async () => {
    setIsProcessing(true); // Set to processing state
    const res = await apiDeposit(1000); // Giả lập với giá trị 1000
    setPaymentStatus(res.status);
    setIsProcessing(false); // Stop processing after API response
  };

  const renderPaymentStatus = () => {
    if (isProcessing) {
      return (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600">Đang xử lý thanh toán...</h1>
        </div>
      );
    }

    if (paymentStatus === null) {
      return (
        <div className="text-center">
          <button
            onClick={handleVNPayPaymentConfirm}
            className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Xác nhận thanh toán
          </button>
        </div>
      );
    }

    if (paymentStatus) {
      return (
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
          <p className="mt-4 text-gray-600">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Trở về
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Thanh toán thất bại!</h1>
        <p className="mt-4 text-gray-600">Vui lòng thử lại hoặc liên hệ hỗ trợ nếu gặp sự cố.</p>
        <button
          onClick={() => navigate(`${PATH.SYSTEM}/${PATH.DEPOSIT}`)}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white py-8 px-4">
      <div className="text-center">{renderPaymentStatus()}</div>
    </div>
  );
};

export default DepositSuccess;
