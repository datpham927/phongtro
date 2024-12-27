// import { setPostFilterCode } from "../redux/postSlice/postSlice";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { PATH } from "../../utils/constant";
import { useEffect } from "react";
import { setCategories } from "../../redux/category/categorySlice";
import { apiGetAllCategory } from "../../services/apiCategory";
import { v4 as uuidv4 } from 'uuid';
const NavigateComponent = () => {
  const { categories } = useAppSelector((state) => state.category);
  const dispatch=useAppDispatch()
  useEffect(() => {
    const fetchApi = async () => {
      const res = await apiGetAllCategory(null);
      if (res?.status) {
        dispatch(setCategories(res?.data.categories));
      }
    };
    fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const notActive =
    "text-white text-sm font-semibold px-3 py-[10px]  hover:bg-red-custom";
  const active =
    "text-white text-sm font-semibold px-3 py-[10px] bg-red-custom hover:opacity-95";

  return (
    <div
      className='bg-blue-custom w-full z-[999] top-0 sticky '
    >
      <div className="w-[1100px] mx-auto  flex items-center pb-5">
        <NavLink
          end
          to={PATH.HOME}
          className={({ isActive }) => (isActive ? active : notActive)}
          onClick={() => {
            // dispatch(setPostFilterCode(""));
          }}
        >
          Trang chủ
        </NavLink>
        {categories?.map((e) => (
          <NavLink key={uuidv4()}to={`/${e.slug}`} className={({ isActive }) => (isActive ? active : notActive)}>
            {e.name}
          </NavLink>
          ))}   
      </div>
    </div>
  );
};

export default NavigateComponent;
