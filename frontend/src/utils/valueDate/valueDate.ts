const validate = (valueForm, setInvalidFields) => {
  let error = true;
  let valueFormArray = Object.entries(valueForm);
  valueFormArray.forEach((e) => {
    if (e[1] === "" || e[1] === 0) {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: e[0],
          message: "Bạn không được bỏ trống trường này",
        },
      ]);
      error++;
    }
  });
  valueFormArray.forEach((e) => {
    switch (e[0]) {
      case "phone": {
        if (!/^\d+$/.test(e[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: e[0],
              message: "Vui lòng nhập chính xác số điện thoại",
            },
          ]);
        }
        error = false;

        break;
      }
      case "password": {
        if (e[1]?.length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: e[0],
              message: "Mật khẩu phải nhiều hơn 6 ký tự",
            },
          ]);
          error = false;
        }
        break;
      }

      default:
        break;
    }
  });
  return error;
};

export default validate;
