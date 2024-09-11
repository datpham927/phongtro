
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { BallTriangle } from "react-loader-spinner"
// import { useAppSelector } from "../../redux/hooks"

// const EditAccount = () => {
//   const dispatch = useDispatch()
//   const { user } = useAppSelector((state) => state.user)
//   const [invalidFields, setInvalidFields] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [dataEditUser, setDataEditUser] = useState({
//     zalo: user.zalo || "",
//     name: user.name || "",
//     // phone:user.phone||"",
//     avatar: user.avatar || "",
//     fbUrl: user.fbUrl || "",
//   })

//   const handleUploadImage = async (e) => {
//     setIsLoading(true)
//     const files = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", files);
//     formData.append("upload_preset", process.env.REACT_APP_UPLOAD_NAME);
//     const response = await getApiUploadImage(formData)
//     if (response) {
//       setDataEditUser((prev) => ({ ...prev, avatar: response.url }))
//     }
//     setIsLoading(false)
//   }

//   const handleSummit = async () => {
//     if (valueDate(dataEditUser, setInvalidFields)) {
//       const response = await apiUpdateUser(dataEditUser)
//       if (response.err === 1) {
//         toastMessage("Cập nhật không thành công")
//       } else {
//         toastMessage("Cập nhật thành công")
//           const response = await getDetailUser();
//           if (response.err === 0) {
//             dispatch(setUser((response.user)));
//           }
//       }
//     }
//   }
//   return (
//     <div className="px-6">
//       <div className="py-4 border-solid border-b-[1px] border-slate-300">
//         <h1 className="text-2xl font-normal">Cập nhật thông tin cá nhân</h1>
//       </div>
//       <div className="flex justify-center  items-center my-5">
//         <div className="flex w-[60%] gap-4 flex-col ">
//           <div className="flex flex-col gap-4 my-5">
//             <InputReadOnly direction={"flex-row"} label={"Mã thành viên"} value={user?.id?.match(/\d+(\.\d+)?/g)
//               .join("")
//               .slice(0, 5)} />
//             <InputReadOnly direction={"flex-row"} label={"Số điện thoại"} value={user?.phone} isEditPhone />
//           </div>
//           <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields}
//             name={"name"} direction={"flex-row"} label={"Tên hiển thị"} value={dataEditUser?.name} setValue={setDataEditUser} />
//           <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields}
//             name={"zalo"} direction={"flex-row"} label={"Số Zalo"} value={dataEditUser?.zalo} setValue={setDataEditUser} />
//           <InputForm setInvalidFields={setInvalidFields} invalidFields={invalidFields}
//             name={"fbUrl"} direction={"flex-row"} label={"Facebook"} value={dataEditUser?.fbUrl} setValue={setDataEditUser} />
//           <div className="flex  my-5">
//             <label className="flex items-end w-1/3">Mật khẩu</label>
//             <div>
//               <span className="text-sm text-blue-custom">Đổi mật khẩu</span>
//             </div>
//           </div>
//           <div className="flex my-5">
//             <label className="w-1/3">Ảnh đại diện</label>
//             <div className="flex flex-col text-center gap-4">
//               <img className="w-[140px] h-[140px]  rounded-full shadow-custom" src={`${dataEditUser?.avatar ? dataEditUser?.avatar : "https://phongtro123.com/images/default-user.png"}`} />
//               <input type="file" id="avatar" hidden
//                 onChange={handleUploadImage}
//               />
//               <label htmlFor="avatar" className="flex justify-center px-2 py-1 bg-slate-200 rounded-md" >
//                 {isLoading ? (
//                   <BallTriangle
//                     height={20}
//                     width={20}
//                     radius={5}
//                     color="#4fa94d"
//                     ariaLabel="ball-triangle-loading"
//                     wrapperClass={{}}
//                     wrapperStyle=""
//                     visible={true}
//                   />
//                 ) : (
//                   <>Chọn ảnh</>
//                 )}
//               </label>
//             </div>
//           </div>
//           <ButtonComponent text="Lưu & Cập nhật" className={"bg-blue-custom cursor-pointer text-white hover:bg-blue-700"}
//             onClick={handleSummit}
//           />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default EditAccount