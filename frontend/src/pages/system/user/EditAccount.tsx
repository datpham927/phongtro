import { useCallback, useEffect, useState } from "react"
import { BallTriangle } from "react-loader-spinner"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import InputReadOnly from "../../../components/InputComponent/InputReadOnly"
import InputForm from "../../../components/InputComponent/InputForm"
import { ButtonComponent } from "../../../components"
import { apiUploadImage } from "../../../services/apiUploadPicture"
import { apiUpdateProfile } from "../../../services/apiUser"
import validate from "../../../utils/validate"
import { setDetailUser } from "../../../redux/user/userSlice"
import { setLoading } from "../../../redux/action/actionSlice"

const EditAccount = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const [invalidFields, setInvalidFields] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataEditUser, setDataEditUser] = useState<any>()
 

  useEffect(()=>{
      setDataEditUser(user) 
  },[user])
  
  const handleUploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    const files = e.target.files?.[0]
    if (files) {
      const formData = new FormData()
      formData.append("file", files)
      formData.append("upload_preset", import.meta.env.VITE_REACT_UPLOAD_PRESET)
      const response = await apiUploadImage(formData)
      if (response) {
        setDataEditUser((prev: any) => ({
          ...prev,
          avatar: response.url  // Cập nhật URL ảnh đại diện
        }))
      }
    }
    setIsLoading(false)
  },[])

  const handleSummit = async () => {
    dispatch(setLoading(true))
    if (validate(dataEditUser, setInvalidFields)) {
      const response = await apiUpdateProfile(dataEditUser)
      if (!response.status) { alert("Cập nhật không thành công");return}
    dispatch(setLoading(false))
      alert("Cập nhật thành công")
      dispatch(setDetailUser(response.data))
    }
  }

  return (
    <div className="px-6">
      <div className="py-4 border-b-[1px] border-slate-300">
        <h1 className="text-2xl font-normal">Cập nhật thông tin cá nhân</h1>
      </div>
      <div className="flex justify-center items-center my-5">
        <div className="flex w-[60%] gap-4 flex-col">
          <div className="flex flex-col gap-4 my-5">
            <InputReadOnly
              direction={"flex-row"}
              label={"Mã thành viên"}
              value={user?.id?.match(/\d+(\.\d+)?/g)?.join("")?.slice(0, 5)}
            />
            <InputReadOnly
              direction={"flex-row"}
              label={"Số điện thoại"}
              value={user?.phone}
            />
          </div>
          <InputReadOnly direction={"flex-row"} label={"Email"} value={user?.email} />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name={"name"}
            direction={"flex-row"}
            label={"Tên hiển thị"}
            value={dataEditUser?.name}
            setValue={setDataEditUser}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name={"zalo"}
            direction={"flex-row"}
            label={"Số Zalo"}
            value={dataEditUser?.zalo}
            setValue={setDataEditUser}
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            name={"facebook"}
            direction={"flex-row"}
            label={"Facebook"}
            value={dataEditUser?.facebook}
            setValue={setDataEditUser}
          />
          <div className="flex my-5">
            <label className="w-1/3">Mật khẩu</label>
            <button className="text-sm text-blue-custom">Đổi mật khẩu</button>
          </div>
          <div className="flex my-5">
            <label className="w-1/3">Ảnh đại diện</label>
            <div className="flex flex-col text-center gap-4">
              <img
                className="w-[140px] h-[140px] rounded-full shadow-custom"
                src={
                  dataEditUser?.avatar ||
                  "https://phongtro123.com/images/default-user.png"
                }
              />
              <input
                type="file"
                id="avatar"
                hidden
                onChange={handleUploadImage}
              />
              <label
                htmlFor="avatar"
                className="flex justify-center px-2 py-1 bg-slate-200 rounded-md"
              >
                {isLoading ? (
                  <BallTriangle
                    height={20}
                    width={20}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    visible={true}
                  />
                ) : (
                  <>Chọn ảnh</>
                )}
              </label>
            </div>
          </div>
          <ButtonComponent
            text="Lưu & Cập nhật"
            className={"bg-blue-custom cursor-pointer text-white hover:bg-blue-700"}
            onClick={handleSummit}
          />
        </div>
      </div>
    </div>
  )
}

export default EditAccount
