import { useEffect, useState } from "react"
import { BallTriangle } from "react-loader-spinner"  
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import InputForm from "../../../components/InputComponent/InputForm"
import { ButtonComponent } from "../../../components"

const EditAccount = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const [invalidFields, setInvalidFields] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataEditUser, setDataEditUser] = useState<any>()
 

  useEffect(()=>{
      setDataEditUser(user) 
  },[user])
  
   

  const handleSummit = async () => {
     
  }

  return (
    <div className="px-6">
      <div className="py-4 border-b-[1px] border-slate-300">
        <h1 className="text-2xl font-normal">Đổi mật khẩu</h1>
      </div>
      <div className="flex justify-center items-center my-5">
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
          <ButtonComponent
            text="Lưu & Cập nhật"
            className={"bg-blue-custom cursor-pointer text-white hover:bg-blue-700"}
            onClick={handleSummit}
          />
        </div>
      </div>
  )
}

export default EditAccount
