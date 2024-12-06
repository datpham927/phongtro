import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

const ProgressBar: React.FC = () => {
  const { loading } = useAppSelector((state) => state.action);
  const [progress, setProgress] = useState(0);

  console.log(progress); // Xem giá trị progress để debug

  useEffect(() => {
    if (loading) {
      setProgress(0); // Reset thanh tiến trình khi bắt đầu loading
      const timer = setTimeout(() => {
        setProgress(80); // Đặt tiến trình lên 80% sau một thời gian ngắn
      }, 100); // Chậm một chút để hiệu ứng mượt mà hơn
      return () => clearTimeout(timer); // Dọn dẹp timer khi loading kết thúc
    } else {
        setProgress(0);   // Khi không còn loading, chuyển thanh tiến trình thành 100%
    }
  }, [loading]);

  if (!loading) return null; // Ẩn thanh khi không có tiến trình

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
