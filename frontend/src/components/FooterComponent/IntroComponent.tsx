import { Link } from "react-router-dom";
import { convertVietnamese } from "../../utils/format/convertVietnamese";
import { textInfo } from "../../utils/constant";
import { memo } from "react";
import { starToArr } from "../../utils/starToArr";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const IntroComponent = () => {
  // const { categories } = useSelector((state) => state.category);
  return (
    <div className="w-full bg-white rounded-md shadow-md p-4 gap-4 flex-col flex justify-center items-center">
      <h3 className="font-bold text-xl  ">{textInfo.title}</h3>
      <p className="text-gray-800 text-center my-4  text-base">
        {textInfo.description}
        <span className="text-link">
          {/* {categories?.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  to={`/${convertVietnamese(item.value)}`}
                  key={item.code}
                  className="text-blue-600 font-medium hover:text-orange-600"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })} */}
        </span>
        {textInfo.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {textInfo.statistic.map((item, index) => {
          return (
            <div
              className="flex flex-col justify-center items-center"
              key={index}
            >
              <h4 className="font-bold  text-xl ">{item.value}</h4>
              <p className="text-gray-700  text-base">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-base py-2">{textInfo.price}</h3>
      <div className="flex items-center justify-center gap-1">
        <span className="text-yellow-400">
          <span className="text-yellow-400 text-sm flex shrink-0">
            {starToArr(5).map(() => <ion-icon name="star"></ion-icon>)}
          </span>
        </span>
      </div>
      <p className="text-gray-600 italic text-center  text-base">
        {textInfo.comment}
      </p>
      <span className="text-gray-700  text-base">{textInfo.author}</span>
      <h3 className="font-bold text-base  py-2 ">{textInfo.question}</h3>
      <p>{textInfo.answer}</p>
      <ButtonComponent
        text="Đăng tin ngay"
        className={"bg-blue-custom text-white px-6"}
      />
    </div>
  );
};

export default memo(IntroComponent);
