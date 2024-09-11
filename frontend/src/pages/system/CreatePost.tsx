import { useState } from "react";
import { AddressComponent } from "../../components";
import { IDetailPost } from "../../interfaces/Post";


function CreatePost() {
  const [payload, setPayload] = useState<IDetailPost>( );
  const [invalidFields, setInvalidFields] = useState([]);
 
  return (       
    <div className="h-full px-7 flex flex-col">
      <div className="  w-full border-solid border-b-[1px] border-gray-300">
        <h1 className=" text-3xl py-3  ">
             Đăng tin mới
        </h1>
      </div>
      <div className="flex">
        <div className="flex flex-col gap-3 w-[60%]">
          <AddressComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {/* <OverviewComponent
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            isEdit={isEdit}
            setIsEdit={setIsEdit} */}
          {/* /> */}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
