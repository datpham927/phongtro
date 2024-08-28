import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import PageNumberComponent from "./PageNumberComponent";
import { memo } from "react";

function PaginationComponent({ totalPage, currentPage = 1 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const entries = searchParams.entries();

  const append = (entries, currentPage) => {
    searchParams.append("page", currentPage);
    const params = [];
    for (let p of entries) {
      params.push(p);
    }
    let a = {};
    params.map((e) => (a = { ...a, [e[0]]: e[1] }));
    return a;
  };
  const handelNumberPage = () => {
    let newArray = [];
    for (let i = 2; i <= totalPage; i++) {
      newArray.push(i);
    }
    const pageNumber = [
      currentPage - 1,
      currentPage - 2,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
    return newArray.filter((e) => pageNumber.includes(e));
  };

  const handleOnclick = (number) => {
    navigate(
      {
        pathname: `${location.pathname}`,
        search: createSearchParams(append(entries, number)).toString(),
      },
      { state: number - 1 }
    );
  };
  return (
    totalPage > 1 && (
      <div className="flex justify-center my-5 gap-2">
        <PageNumberComponent
          onClick={() => handleOnclick(1)}
          active={currentPage === 1 ? true : false}
        >
          1
        </PageNumberComponent>
        {currentPage >= 5 && (
          <PageNumberComponent onClick={() => handleOnclick(1)}>
            ...
          </PageNumberComponent>
        )}
        {handelNumberPage().map((e) => (
          <PageNumberComponent
            active={currentPage === e ? true : false}
            onClick={() => handleOnclick(e)}
          >
            {e}
          </PageNumberComponent>
        ))}
        {currentPage < totalPage - 2 && (
          <>
            <PageNumberComponent onClick={() => handleOnclick(1)}>
              ...
            </PageNumberComponent>
            <PageNumberComponent onClick={() => handleOnclick(totalPage)}>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </PageNumberComponent>
          </>
        )}
      </div>
    )
  );
}

export default memo(PaginationComponent);
