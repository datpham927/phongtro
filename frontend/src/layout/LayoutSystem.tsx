import { Link, Outlet } from "react-router-dom";
import { NavigateComponent, SidebarComponent } from "../components";
import { useAppSelector } from "../redux/hooks";
import LoadingComponent from "../components/LoadingComponent";

function LayoutSystem() { 
  const { type } = useAppSelector((state ) => state.user);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex w-full bg-blue-custom top-0 sticky ">
        <Link
          to="/"
          className="flex justify-center py-2 items-center mr-5 ml-4 text-white font-semibold"
        >
          phongtro123.com
        </Link>
       { type!=="admin"&& <NavigateComponent />}
      </div>
      <div className="flex h-full">
        <div className="w-1/6 bg-primary-bg h-auto">
          <SidebarComponent />
        </div>
        <div className="w-5/6 h-screen bg-white overflow-scroll">
          <Outlet />
        </div>
      </div>
      <LoadingComponent/> 
    </div>

  );
}

export default LayoutSystem;
