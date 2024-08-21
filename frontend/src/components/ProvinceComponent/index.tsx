import { location, titleHomePage } from "../../utils/constant";
import ProvinceItemComponent from "./ProvinceItemComponent";

function ProvinceComponent() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">{titleHomePage.title}</h1>
        <p className="text-sm text-gray-500 mt-3">
          {titleHomePage.description}
        </p>
      </div>
      <div className="flex justify-center mt-4">
        {location.map((e) => (
          <ProvinceItemComponent image={e.image} title={e.name} />
        ))}
      </div>
    </>
  );
}

export default ProvinceComponent;
