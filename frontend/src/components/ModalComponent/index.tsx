/* eslint-disable no-self-compare */
import { memo, useEffect, useState } from "react";
import {
   convertDecimal,
   getNumberArea,
   getNumberPrice,
   splitStringToNumber,
} from "../../utils/format/convertVietnamese";

function ModalComponent({
   content,
   setHideModal,
   name,
   onSummit,
   isSelectValue,
}) {
   const { min, max, code } = isSelectValue;

   const [percent1, setPercent1] = useState(min ? min : 0);
   const [percent2, setPercent2] = useState(max ? max : 100);
   const [isSelect, setIsSelect] = useState(code ? code : "");

//    useEffect(() => {
//       if (["price", "area"].includes(name)) {
//          const trackActive = document.querySelector("#track-active");
//          if (percent1 > percent2) {
//             trackActive.style.left = `${percent2}% `;
//             trackActive.style.right = `${100 - percent1}%`;
//          } else {
//             trackActive.style.left = `${percent1}% `;
//             trackActive.style.right = `${100 - percent2}%`;
//          }
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//    }, [percent1, percent2]);

   const handleOnclickTrack = (e) => {
      const stackEl = document.getElementById("track");
      const stackRect = stackEl.getBoundingClientRect();
      let percent = Math.round(
         ((e.pageX - stackRect.left) * 100) / stackRect.width,
         0
      );
      if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
         setPercent1(percent);
      } else {
         setPercent2(percent);
      }
   };
   const handelSelectFast = (e, name) => {
      setIsSelect(e);
      const priceRange = splitStringToNumber(e.value);
      const maxNumber = name === "price" ? 15 : 90;
      if (priceRange[1]) {
         setPercent1((priceRange[0] * 100) / maxNumber);
         setPercent2((priceRange[1] * 100) / maxNumber);
      } else {
         setPercent2((priceRange[0] * 100) / maxNumber);
         if (Number(priceRange[0]) === 1 || Number(priceRange[0]) === 20) {
            setPercent1(0);
         } else {
            setPercent1((priceRange[0] * 100) / maxNumber);
         }
      }
   };

   const handleSummit = (e) => {
      e.stopPropagation();
      setHideModal(false);
      const min = percent1 > percent2 ? percent2 : percent1;
      const max = percent1 > percent2 ? percent1 : percent2;
      onSummit({
         [name]: {
            title:
               percent1 === 0 || percent2 === 0
                  ? `Dưới ${convertDecimal(percent2, name)}${name === "price" ? " triệu" : " m2"
                  }`
                  : percent1 === percent2
                     ? `Trên ${percent1 > 0
                        ? convertDecimal(percent1, name) + " triệu"
                        : convertDecimal(percent2, name) + "m2"
                     }`
                     : `${convertDecimal(
                        percent1,
                        name
                     )} - ${convertDecimal(percent2, name)} ${name === "price" ? "triệu" : "m2"
                     }`,
            [`${name}Number`]:
               name === "price"
                  ? getNumberPrice(
                     convertDecimal(percent1, name),
                     convertDecimal(percent2, name)
                  )
                  : getNumberArea(
                     convertDecimal(percent1, name),
                     convertDecimal(percent2, name)
                  ),
         },
         min,
         max,
         code: isSelect?.code,
      });
   }

   return (
      <div
         className="flex fixed w-full h-full bg-[rgba(0,0,0,.5)] top-0 right-0 justify-center items-center z-[999]"
         onClick={() => {
            setHideModal(false);
         }}
      >
         <div
            className="relative w-[700px] bg-white mx-auto rounded-lg  overflow-hidden z-[1000] "
            onClick={(e) => {
               e.stopPropagation();
               setHideModal(true);
            }}
         >
            <div className="flex justify-center py-3 border-solid border-b-[1px] border-slate-300 ">
               <div
                  className="absolute top-[10px] left-[10px]"
                  onClick={(e) => {
                     e.stopPropagation();
                     setHideModal(false);
                  }}
               >  <ion-icon name="arrow-back-outline"></ion-icon>
               </div>
               <span className="text-sm font-medium">{name}</span>
            </div>
            <div className="px-4  h-[450px] overflow-y-scroll">
               {(name === "category" || name === "province") &&
                  content?.map((e) => (
                     <div
                        className={`flex items-center p-2 border-solid  border-b-[1px]  border-slate-300 cursor-pointer hover:text-blue-custom ${code === e?.code ? "text-blue-custom" : ""
                           }`}
                        onClick={(even) => {
                           onSummit({
                              [name]: {
                                 title: e.value,
                                 code: e?.code,
                              },
                              code: e?.code,
                           });
                           setIsSelect(e);
                           even.stopPropagation();
                           setHideModal(false);
                        }}
                     >
                        <input
                           type="radio"
                           checked={code === e?.code}
                           name={name}
                           id={e?.code}
                           value={e.value}
                        />
                        <label
                           htmlFor={e?.code}
                           className={`ml-2 text-[16px] capitalize font-normal ${isSelect?.code === e?.code && "text-blue-custom"
                              }`}
                        >
                           {e.value}
                        </label>
                     </div>
                  ))}
               {/* appearance-none bỏ đi các css mặt định của các trình duyệt */}
               {(name === "price" || name === "area") && (
                  <>
                     <div className="py-4">
                        <div className="flex justify-center items-center my-6 text-xl">
                           {percent1 === 0 || percent2 === 0
                              ? `${percent1 === 0
                                 ? convertDecimal(percent2, name)
                                 : convertDecimal(percent1, name)
                              }`
                              : percent1 === percent2
                                 ? `Trên ${percent1 > percent2
                                    ? convertDecimal(percent1, name)
                                    : convertDecimal(percent2, name)
                                 }`
                                 : ` ${percent1 > percent2
                                    ? convertDecimal(percent2, name)
                                    : convertDecimal(percent1, name)
                                 } - ${percent1 > percent2
                                    ? convertDecimal(percent1, name)
                                    : convertDecimal(percent2, name)
                                 }`}
                           {name === "price" ? "triệu" : "m2"}
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
                              className="slider-track-active  h-[4px] absolute top-0 bottom-0 bg-orange-600 rounded-full"
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
                                 setIsSelect("");
                              }}
                           />
                           <input
                              className="absolute top-0 bottom-0  appearance-none w-full pointer-events-none "
                              type="range"
                              min="0"
                              step="1"
                              value={percent2}
                              onChange={(e) => {
                                 setPercent2(parseFloat(e.target.value));
                                 setIsSelect("");
                              }}
                           />
                        </div>
                        <div className="flex justify-between items-center w-[90%] mx-auto  py-5">
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
                              {name === "price" ? "15 triệu+" : "90m2"}
                           </span>
                        </div>
                        <div>
                           <h2 className="text-xl my-4">Chọn nhanh</h2>
                           <div className="flex flex-wrap gap-3">
                              {content?.map((e) => (
                                 <span
                                    className={`text-[14px] flex justify-center py-1 px-4 rounded-md cursor-pointer ${isSelect?.code === e?.code
                                       ? "bg-blue-custom text-white"
                                       : " bg-[#f1f1f1]"
                                       }`}
                                    onClick={() => handelSelectFast(e, name)}
                                 >
                                    {e.value}
                                 </span>
                              ))}
                           </div>
                        </div>
                        {["price", "area"].includes(name) && (
                           <ButtonComponent
                              text="Áp dụng"
                              className={
                                 "absolute bottom-0 right-0 bg-sky-400 w-full text-white uppercase font-semibold py-3"
                              }
                              onClick={(e) => handleSummit(e, name)}
                           />
                        )}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default memo(ModalComponent);
