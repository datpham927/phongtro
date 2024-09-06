import { toast } from "react-toastify";

const showNotification = (message: string, err?: boolean): void => {
    err
        ? toast(message, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          })
        : toast(message, {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
};
export  default showNotification