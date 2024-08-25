import React, { useState } from "react";
import { location, titleHomePage } from "../../utils/constant";
import ProvinceItemComponent from "./ProvinceItemComponent";

interface TitleWelcome {
  title: string;
  description: string;
}

const ProvinceComponent: React.FC = () => {
  const [titleWelcome, setTitleWelcome] = useState<TitleWelcome>( 
    { title: titleHomePage.title, description: titleHomePage.description },
   );
  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">{titleWelcome.title}</h1>
        <p className="text-sm text-gray-500 mt-3">
          {titleWelcome.description}
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
