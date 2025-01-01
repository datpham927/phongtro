import { memo, useEffect, useState } from "react";
import {
   convertDecimal,
} from "../../utils/format/convertVietnamese";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { roundNumber } from "../../utils/format/roundNumber";
import { v4 as uuidv4 } from 'uuid';
interface ModalRadioComponentProps {
    content: any;
    setOpenModal: (hide: boolean) => void;
    onSummit: any;
    name: string|any;
    type: string;
    min:any,
    max:any,
 }
const ModalRangeComponent: React.FC<ModalRadioComponentProps> = ({
    content,
    setOpenModal,
    onSummit,
    min,max,
    name,
    type,
 }) => {
   const [percent1, setPercent1] = useState<any>( 0);
   const [percent2, setPercent2] = useState<any>( 100);
   const [selectValue, setSelectValue] = useState<any>({min:"",max:""});
   const valueMax=type==="price"?15:90
   useEffect(()=>{
      if(!min||!max) return 
      if(max===999999){
            setPercent1( 100)
            setPercent2( 100)
      }else{
          setPercent1(min/valueMax*100)
          setPercent2(max/valueMax*100)
      }
   },[min,max])

   useEffect(() => {
      let min:number, max:number;
      if (percent1 > percent2) {
         min = percent2 *valueMax/ 100;
         max = percent1 *valueMax/ 100;
      } else if (percent1===percent2) {
         min = percent1 *valueMax/ 100;
         max = 999999;
      } else{
         min = percent1 *valueMax/ 100;
         max = percent2 *valueMax/ 100;
      }
  setSelectValue({ min:roundNumber(min), max:roundNumber(max) });
      if (["price", "area"].includes(type)) {
         const trackActive = document.querySelector("#track-active") as HTMLElement;
         if (percent1 > percent2) {
            trackActive.style.left = `${percent2}%`;
            trackActive.style.width = `${percent1-percent2}%`;
         } else {
            trackActive.style.left = `${percent1}%`;
            trackActive.style.width = `${ percent2-percent1}%`;
         }
      }
   }, [percent1, percent2,type]);

   const handleOnclickTrack = (e: React.MouseEvent<HTMLDivElement>) => {
      const stackEl = document.getElementById("track")!;
      const stackRect = stackEl.getBoundingClientRect();
      const percent = Math.round(((e.pageX - stackRect.left) * 100) / stackRect.width);
     
      if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
         setPercent1(percent);
      } else {
         setPercent2(percent);
      }
   };

   const handleSelectFast = (e: any, type: string) => {
     const min=e.min
     const max=e.max
      const maxNumber = type === "price" ?valueMax: 90;
      if (max) {
         setPercent1((min * 100) / maxNumber);
         max>100?setPercent2(100):setPercent2((max * 100) / maxNumber);
      } else {
         setPercent2((min * 100) / maxNumber);
         if (Number(min) === 1 || Number(min) === 20) {
            setPercent1(0);
         } else {
            setPercent1((min * 100) / maxNumber);
         }
      }
   };

   const handleSummit = (e: any) => {
      e.stopPropagation();
      // setOpenModal(false); 
      onSummit({
         title:
               percent1 === 0 || percent2 === 0
                  ? `Dưới ${convertDecimal(percent2,type)}${type === "price" ? " triệu" : " m2"}`
                  : percent1 === percent2
                     ? `Trên ${convertDecimal(percent1,type)} ${type === "price" ? "triệu" : "m2"}`
                     : `${convertDecimal(percent1,type)} - ${convertDecimal(percent2,type)} ${
                        type === "price" ? "triệu" : "m2"
                     }`,
         min: selectValue.min,
         max: selectValue.max,
      },type);
   };

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
            <div className="flex justify-center py-3 border-b-[1px] border-slate-300">
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
               <div className="py-4">
                  <div className="flex justify-center items-center my-6 text-xl">
                     {selectValue.min === 0 || selectValue.max === 0
                        ? `${convertDecimal(percent2,type)}`
                        : selectValue.min === selectValue.max
                           ? `Trên ${ selectValue.min}`
                           : `${ selectValue.min} - ${selectValue.max}`}
                     {type === "price" ? "triệu" : "m2"}
                  </div>
                  <div className="relative w-[90%] mx-auto">
                     <div
                        id="track"
                        onClick={handleOnclickTrack}
                        className="absolute top-0 bottom-0 w-full h-[5px] bg-gray-300 rounded-full"
                     ></div>
                     <div
                        id="track-active"
                        onClick={handleOnclickTrack}
                        className={`slider-track-active h-[4px]  absolute top-0 bottom-0 bg-orange-600 rounded-full`}
                     ></div>
                     <input
                        className="absolute top-0 bottom-0 w-full appearance-none pointer-events-none"
                        type="range"
                        max="100"
                        min="0"
                        step="1"
                        value={percent1}
                        onChange={(e) => {
                           setPercent1(parseFloat(e.target.value));
                        }}
                     />
                     <input
                        className="absolute top-0 bottom-0 w-full appearance-none pointer-events-none"
                        type="range"
                        min="0"
                        step="1"
                        value={percent2}
                        onChange={(e) => {
                           setPercent2(parseFloat(e.target.value));
                        }}
                     />
                  </div>
                  <div className="flex justify-between items-center w-[90%] mx-auto py-5">
                     <span
                        className="text-base pl-3 cursor-pointer"
                        onClick={(e) => {
                           e.stopPropagation();
                           setPercent1(0);
                        }}
                     >
                        0
                     </span>
                     <span
                        className="text-base cursor-pointer"
                        onClick={(e) => {
                           e.stopPropagation();
                           setPercent2(100);
                        }}
                     >
                        {type === "price" ? "15 triệu+" : "90m2"}
                     </span>
                  </div>
                  <div>
                     <h2 className="text-xl my-4">Chọn nhanh</h2>
                     <div className="flex flex-wrap gap-3">
                        {content?.map((e: any) => (
                           <span
                           key={uuidv4()}
                              className={`text-[14px] flex justify-center py-1 px-4 rounded-md cursor-pointer ${
                               true
                                    ? "bg-blue-custom text-white"
                                    : " bg-[#f1f1f1]"
                              }`}
                              onClick={() => handleSelectFast(e, type)}
                           >
                              {e.value}
                           </span>
                        ))}
                     </div>
                  </div>
                  <ButtonComponent
                     text="Áp dụng"
                     className="absolute bottom-0 right-0 bg-sky-400 w-full text-white uppercase font-semibold py-3"
                     onClick={handleSummit}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default memo(ModalRangeComponent);
