import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useAppDispatch } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/action/actionSlice";
import { apiGetStatistical } from "../../../../services/apiInvoice";

// Đăng ký các thành phần cần thiết
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ManageStatistical: React.FC = () => {
  // State để lưu trữ dữ liệu từ API
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0); // Sửa lại kiểu dữ liệu thành mảng

  const [totalTransactions, setTotalTransactions] = useState<any[]>([]); // Sửa lại kiểu dữ liệu thành mảng
  const [timeRange, setTimeRange] = useState<string>("7ngay"); // State cho khoảng thời gian
  const dispatch = useAppDispatch();

  // useEffect để gọi API khi thời gian thay đổi
  useEffect(() => {
    const fetchApi = async () => {
      dispatch(setLoading(true));
      let res;
      res = await apiGetStatistical({ date: timeRange }); // Gửi thời gian chọn vào API
      dispatch(setLoading(false));
      if (res?.status) {
        const data = res.data;
        const labels = data.statistics?.map((item: any) => item.transaction_day);
        // Tính toán tổng doanh thu và số giao dịch
        setTotalRevenue(data?.total_revenue);
        setTransactionsCount(data?.transactions_count)
        setTotalTransactions(data?.total_transactions); // Lưu danh sách giao dịch
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Doanh thu",
              data: data.statistics?.map((item: any) => parseFloat(item.total_revenue)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        });
      }
    };

    fetchApi();
  }, [timeRange]); // Khi thay đổi timeRange, useEffect sẽ được gọi lại

  return (
    <div className="min-h-screen bg-gray-100 p-8 mx-2 rounded-md">
      <div className="max-w-7xl mx-auto">
        {/* Card - Doanh thu và Tổng số giao dịch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-green-400 text-white p-4 rounded-xl shadow-lg">
            <h3 className="text-xl">Doanh thu</h3>
            <p className="text-2xl font-semibold">{totalRevenue.toLocaleString()} VND</p>
          </div>
          <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg">
            <h3 className="text-xl">Tổng số giao dịch</h3>
            <p className="text-2xl font-semibold">{transactionsCount}</p>
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="mt-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="font-semibold text-lg">Chọn khoảng thời gian</span>
            <select
              className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7ngay">7 ngày</option>
              <option value="1thang">1 tháng</option>
              <option value="1nam">1 năm</option>
            </select>
          </div>
        </div>

        {/* Content - Biểu đồ doanh thu và Danh sách giao dịch */}
        {/* Biểu đồ doanh thu */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Biểu đồ doanh thu</h2>
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        </div>

        {/* Danh sách giao dịch - Dưới biểu đồ */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Danh sách giao dịch</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto max-h-96">
            <table className="min-w-full bg-white table-auto rounded-md shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left text-gray-600">Mã giao dịch</th>
                  <th className="p-2 text-left text-gray-600">Tên khách hàng</th>
                  <th className="p-2 text-left text-gray-600">Số tiền</th>
                  <th className="p-2 text-left text-gray-600">Nội dung giao dịch</th>
                  <th className="p-2 text-left text-gray-600">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {totalTransactions?.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="p-2">{transaction.id}</td>
                    <td className="p-2">{transaction.user.name}</td>
                    <td className="p-2">{parseFloat(transaction.amount).toLocaleString()} VND</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className="p-2">{new Date(transaction.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStatistical;
