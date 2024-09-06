/* eslint-disable no-self-compare */
import { memo } from "react";
import { extractLocation } from "../../utils/format/extractLocation";

 

interface ModalRadioComponentProps {
   content: any;
   setOpenModal: (hide: boolean) => void;
   onSummit: (item: any, type: string) => void;
   name: string|any;
   type: string;
   isSelect: any;
}

const ModalRadioComponent: React.FC<ModalRadioComponentProps> = ({
   content,
   setOpenModal,
   onSummit,
   isSelect,
   name,
   type,
}) => {
   return (
      <div
         className="flex fixed w-full h-full bg-[rgba(0,0,0,.5)] top-0 right-0 justify-center items-center z-[999]"
         onClick={() => setOpenModal(false)}
      >
         <div
            className="relative w-[700px] bg-white mx-auto rounded-lg overflow-hidden z-[1000]"
            onClick={(e) => {
               e.stopPropagation();
               setOpenModal(true);
            }}
         >
            <div className="flex justify-center py-3 border-solid border-b-[1px] border-slate-300">
               <div
                  className="absolute top-[10px] left-[10px]"
                  onClick={(e) => {
                     e.stopPropagation();
                     setOpenModal(false);
                  }}
               >
                  <ion-icon name="arrow-back-outline"></ion-icon>
               </div>
               <span className="text-sm font-medium">{name}</span>
            </div>
            <div className="px-4 h-[450px] overflow-y-scroll">
               {content?.map((e:any) => (
                  <div
                     key={e.slug}
                     className={`flex items-center p-2 border-solid border-b-[1px] border-slate-300 cursor-pointer hover:text-blue-custom ${
                        isSelect?.category_slug === e.slug ||isSelect?.city_slug === e.city_slug ? "text-blue-custom" : ""
                     }`}
                     onClick={(event) => {
                        // Create an object with either category_slug or city_slug
                        const payload = e.slug
                           ? { category_slug: e.slug }
                           : { city_slug:  e.city_slug  };
                        onSummit(payload, type);
                        event.stopPropagation();
                     }}
                     
                  >
                     <input
                        type="radio"
                        checked={isSelect?.category_slug === e.slug||isSelect?.city_slug === e.city_slug}
                        name={name}
                        id={e.slug||e.city_slug}
                        value={e.name||e.city_name}
                     />
                     <label
                        htmlFor={e.slug}
                        className={`ml-2 text-[16px] capitalize font-normal cursor-pointer ${
                           isSelect?.category_slug === e.slug ||isSelect?.city_slug === e.city_slug && "text-blue-custom"
                        }`}
                     >
                        {e.name||e.city_name}
                     </label>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default memo(ModalRadioComponent);
