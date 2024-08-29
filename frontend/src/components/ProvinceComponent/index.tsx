import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { location, titleHomePage } from "../../utils/constant";
import ProvinceItemComponent from "./ProvinceItemComponent";

interface TitleWelcome {
  title: string | undefined;
  description: string | undefined;
}

const ProvinceComponent: React.FC = () => {
  const [titleWelcome, setTitleWelcome] = useState<TitleWelcome>({
    title: titleHomePage.title,
    description: titleHomePage.description,
  });

  const { categories } = useAppSelector((state) => state.category);
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    if (slug) {
      const category = categories.find((e) => e.slug === slug);
      setTitleWelcome({
        title: category?.title,
        description: category?.sub_title,
      });
    } else {
      setTitleWelcome({
        title: titleHomePage.title,
        description: titleHomePage.description,
      });
    }
  }, [slug, categories]);

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">{titleWelcome.title}</h1>
        <p className="text-sm text-gray-500 mt-3">{titleWelcome.description}</p>
      </div>
      <div className="flex justify-center mt-4">
        {location.map((e) => (
          <ProvinceItemComponent key={e.name} image={e.image} title={e.name} />
        ))}
      </div>
    </>
  );
};

export default ProvinceComponent;
