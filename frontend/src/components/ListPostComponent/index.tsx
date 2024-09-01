import { memo } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ItemPostComponent from "../ItemPostComponent";
import { IPost } from "../../interfaces/Post";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyComponent from "../EmptyComponent";

interface ListComponentProps {
  data: IPost[];
  totalPost: number;
}

const ListPostComponent: React.FC<ListComponentProps> = ({ data, totalPost }) => {
  const location = useLocation();
  const queries = queryString.parse(location.search);
  const navigate = useNavigate();

  const handleNewPost = () => {
    const { ...queryParams } = queries;
    const updatedQueryParams = { ...queryParams, orderby: "ctime" };
    const newQuery = queryString.stringify(updatedQueryParams);
    navigate(`?${newQuery}`);
  };

  const handleDefaultPost = () => {
    const { orderby, ...queryParams } = queries;
    const updatedQueryParams = { ...queryParams };
    const newQuery = queryString.stringify(updatedQueryParams);
    navigate(`?${newQuery}`);
  };
   const active=location.search.includes("orderby")
  return (
    data.length>0?<div className="bg-white py-4 rounded-md shadow-custom ">
      <div className="px-4">
        <h1 className="text-lg font-medium my-1">Tổng {totalPost} kết quả</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sắp Xếp:</span>
          <ButtonComponent
            text="Mặc định"
            className={`bg-primary-bg !py-1 text-sm ${!active&&"font-medium underline"}`}
            onClick={handleDefaultPost}
          />

          <ButtonComponent
            text="Mới nhất"
            className={`bg-primary-bg !py-1 text-sm ${active&&"font-medium underline"}`}
            onClick={handleNewPost}
          />
        </div>
      </div>

      <div className="mt-3">
        {data?.map((post) => (
          <ItemPostComponent key={post.id} props={post} />
        ))}
      </div>
    </div>
    :<EmptyComponent/>
  );
};

export default memo(ListPostComponent);
