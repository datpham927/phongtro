const validate = (
  valueForm: Record<string, any>,
  setInvalidFields: (fields: Array<{ name: string; message: string }>) => void
) => {
  let error = true;
  const invalidFields: Array<{ name: string; message: string }> = [];
  const valueFormArray = Object.entries(valueForm);

  valueFormArray.forEach(([key, value]) => {
    if (key === 'images'&&value.length===0) {
      invalidFields.push({
        name: key,
        message: "Vui lòng chọn hình ảnh!",
      });
      error = false;
    }
    if (value === "" || value === 0) {
      invalidFields.push({
        name: key,
        message: "Bạn không được bỏ trống!",
      });
      error = false;
    }
  });

  valueFormArray.forEach(([key, value]) => {
    switch (key) { 
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            invalidFields.push({ name:key, message: 'Email không hợp lệ' });
            error = false;
        }
        break;
      }
      case "phone": {
        if (!/^\d+$/.test(value)) {
          invalidFields.push({
            name: key,
            message: "Vui lòng nhập chính xác số điện thoại",
          });
          error = false;
        }
        break;
      }
      case "password": {
        if (value?.length < 6) {
          invalidFields.push({
            name: key,
            message: "Mật khẩu phải nhiều hơn 6 ký tự",
          });
          error = false;
        }
        break;
      }
      case "confirm_password": {
        const password = valueForm["password"];
        if (value !== password) {
          invalidFields.push({
            name: key,
            message: "Mật khẩu xác nhận không giống",
          });
          error = false;
        }
        break;
      }
      default:
        break;
    }
  });
  setInvalidFields(invalidFields);
  return error;
};

export default validate;
