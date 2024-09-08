import React, { memo } from "react";
import { IFilterCategory, IFilterDouble } from "../../interfaces/filter";

 
interface ItemNavbarComponentProps {
  title: string;
  content: IFilterDouble[] | IFilterCategory[];
  isDouble?: boolean;
  handleOnClick?:any|undefined
}
const ItemNavbarComponent: React.FC<ItemNavbarComponentProps> = ({
  title,
  content,
  isDouble,
  handleOnClick,
}) => {
  return (
    <div className="w-full bg-white rounded-md p-4 shadow-custom mb-5">
      <h1 className="text-lg font-medium mb-2">{title}</h1>
      <div className={isDouble ? "grid grid-cols-2" : ""}>
        {content?.map((item) => (
          <div
            key={"value" in item ? item.value : item.name}
            onClick={() => handleOnClick(item)}
            className="flex items-center text-neutral-700 text-sm py-2 border-solid border-b-[1px] border-gray-100"
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
            <span className="ml-2 cursor-pointer hover:text-orange-500">
              {"value" in item ? item.value : item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(ItemNavbarComponent);
