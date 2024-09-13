export function getOneYearLater() {
    const currentDate = new Date();
    const oneYearLater = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    
    // Định dạng ngày theo "dd/mm/yyyy"
    return oneYearLater.toLocaleDateString('vi-VN');
  }
  