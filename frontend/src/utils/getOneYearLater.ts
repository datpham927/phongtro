export function getOneYearLater() {
    const currentDate = new Date();
    const oneYearLater = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    return oneYearLater;
  }
  