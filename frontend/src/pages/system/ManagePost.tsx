// import { useEffect, useState } from "react";
// import SelectAddress from "../../components/SelectAddress";
// import { apiDeletePost, apiGetPostAdmin } from "../../services/portServices";
// import ItemManagePost from "../../components/ItemManagePost";
// import { checkStatus } from "../../utils/checkStatus";
// import EditPostComponent from "../../components/EditPostComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { setDataEditPost, setIsUpdate } from "../../redux/appSlice/appSlice";
// import toastMessage from "../../components/toastMessage";
// function ManagePost() {
//   const [posts, setPost] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);
//   const {isUpload}=useSelector((state)=>state.app)
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchApi = async () => {
//       const response = await apiGetPostAdmin();
//       if (response?.err === 1) return;
//       setPost(response?.data?.rows);
//     };
//     fetchApi();
//   }, [isUpload]);

// const handleDeletePost=async(postId)=>{
        
//   const response=await apiDeletePost(postId)
//   if(response.err==1){
//     toastMessage(response?.message)
//   }else{
//     toastMessage(response?.message)
//     dispatch(setIsUpdate())
//   }
// }


//   return (
//     <div className="w-full p-6">
//       <div className="flex justify-between items-center  border-solid border-b-[1px] border-gray-300 mb-6">
//         <h1 className="flex text-2xl py-3 ">Quản lý tin đăng</h1>
//         <div>
//           <SelectAddress
//             className="w-auto"
//             label="Lọc theo trạng thái"
//             options={[
//               { id: 1, value: "Tin đang hiển thị" },
//               { id: 2, value: "Tin hết Hạn" },
//               { id: 3, value: "Tin đang ẩn" },
//             ]}
//           />
//         </div>
//       </div>
//       <div className="w-full ">
//         <ul className=" grid grid-cols-7 divide-x  border-solid border-[1px] border-slate-2200">
//           <li className="p-[10px] font-semibold text-sm">Mã tin</li>
//           <li className="p-[10px] font-semibold text-sm">Ảnh đại diện</li>
//           <li className="p-[10px] font-semibold text-sm">Giá</li>
//           <li className="p-[10px] font-semibold text-sm">Ngày bắt đầu</li>
//           <li className="p-[10px] font-semibold text-sm">Ngày hết hạn</li>
//           <li className="p-[10px] font-semibold text-sm">Trạng thái</li>
//           <li className="p-[10px] font-semibold text-sm">Tùy chọn</li>
//         </ul>
//         <div className=" border-[1px] border-t-[2px] border-solid border-slate-200">
//           {posts?.map((e) => {
//             const arrDate = e?.overview?.expire.split(" ");
//             const date = `${arrDate[3].split("/").reverse().join("-")} ${
//               arrDate[2]
//             }`;
//             return (
//               <ItemManagePost
//                 key={e?.id}
//                 avatar={JSON.parse(e?.images?.image)[0]}
//                 id={e?.id
//                   ?.match(/\d+(\.\d+)?/g)
//                   .join("")
//                   .slice(0, 5)}
//                 expireDate={e?.overview?.expire}
//                 price={e?.attributes.price}
//                 startDate={e?.overview?.created}
//                 //
//                 status={checkStatus(date)}
//                 onClickEdit={() => dispatch(setDataEditPost(e))}
//                 onClickDelete={()=>handleDeletePost(e?.id)}
//                 setIsEdit={setIsEdit}
//               />
//             );
//           })}
//         </div>
//         {isEdit && <EditPostComponent setIsEdit={setIsEdit}  />}
//       </div>
//     </div>
//   );
// }

// export default ManagePost;
