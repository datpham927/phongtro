
// const apiSendEmail = async (email: string) => {
//     try {
//         const res = await axiosJWT.put('auth/verify/token', { email });
//         return res.data;
//     } catch (error) {
//         return {
//             success: false,
//             message: error,
//         };
//     }
// };

import { axiosJWT, httpRequest } from "../utils/httpRequest";

// const apiConfirmEmail = async (email: string, token: string) => {
//     try {
//         const res = await axiosJWT.put('auth/confirm', { token, email });
//         return res.data;
//     } catch (error) {
//         return {
//             success: false,
//             message: error,
//         };
//     }
// };

const apiRegister = async ( data:any) => {
    try {
        const res = await axiosJWT.post('auth/register',data);
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiLogin = async (email: string, password: string) => {
    try {
        const res = await axiosJWT.post('auth/login', { email, password });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const sendMailForgot = async (email:string) => {
    try {
        const res = await httpRequest.post('auth/reset_password', {email});
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};
const resetPassword = async (token: string, password: string) => {
    try {
        const res = await axiosJWT.put(`auth/${token}/change_password`, { password });
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiLogout = async () => {
    try {
        const res = await axiosJWT.post('auth/logout');
        return res.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const apiRefreshToken = async (refreshToken:any) => {
    try {
        const res = await axiosJWT.post('auth/refresh_token', {"refresh_token":refreshToken });
        return res.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        };
    }
};
// const apiLoginWithGoogle = async (token:any) => {
//     try {
//         const res = await httpRequest.post('auth/login_google', { token });
//         return res.data;
//     } catch (error) {
//         console.log(error);
//         return {
//             success: false,
//             message: error,
//         };
//     }
// };

export {
    // apiSendEmail,
    // apiConfirmEmail,
    apiRefreshToken,
    apiRegister,
    apiLogin,
    sendMailForgot,
    resetPassword,
    apiLogout,
    // apiLoginWithGoogle
    
};
