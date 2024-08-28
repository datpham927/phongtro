export const checkStatus = (date) => {
  const currentDate = new Date().getTime();
  const expire = new Date(date).getTime();
  return expire > currentDate ? "Đang hoạt động" : "Đã hết hạn";
};
